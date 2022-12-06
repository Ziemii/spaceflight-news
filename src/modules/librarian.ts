import { DEFAULTS, HTML } from './constants';
import Article from './article';

export default class Librarian {

  static createLibraryButton(article: Article) {
    const libraryButton = document.createElement('button');
    libraryButton.id = String(article.id);
    if (Librarian.isArticleInLibrary(article)) {
      libraryButton.innerHTML = HTML.TEMPLATES.LIBRARY.BUTTONS.REMOVE;
      libraryButton.className = HTML.PARAMETERS.LIBRARY.BUTTONS.REMOVE.CLASS;
      libraryButton.addEventListener('click', Librarian.removeFromLibrary);
    } else {
      libraryButton.innerHTML = HTML.TEMPLATES.LIBRARY.BUTTONS.ADD;
      libraryButton.className = HTML.PARAMETERS.LIBRARY.BUTTONS.ADD.CLASS;
      libraryButton.addEventListener('click', Librarian.addToLibrary);
    }
    return libraryButton;
  }

  static getLibrary(): Article[] {
    const library = localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME);
    if (library) {
      return JSON.parse(library);
    } else {
      console.error("Can't load library");
      return Array(0)
    }
  }

  static isArticleInLibrary(article: Article) {
    const library = Librarian.getLibrary() || [];
    const id_array = library.map(article => article.id);
    if (id_array.includes(article.id)) return true;
    return false;
  }

  static async fetchArticle(articleId): Promise<Article> {
    const article =
      await fetch(DEFAULTS.API_ADDRESS + `/${articleId}`)
        .then(response => {
          if (!response.ok) return Promise.reject('Couldn\'t get article');
          return response.json();
        })
        .catch(error => {
          console.log(error);
        });
    return article;
  }

  static async addToLibrary(event: Event) {
    const articleId = (event.target as HTMLButtonElement).id;
    try {
      const library = Librarian.getLibrary();
      const article = await Librarian.fetchArticle(articleId);
      const index = library.findIndex(element => element.id === parseInt(articleId));
      if (index >= 0) {
        console.error('Article already in Library.');
      } else {
        library.push(article);
        localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(library));
        Librarian.changeLibraryButtonToRemove(articleId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  static removeFromLibrary(event: Event) {
    const articleId = (event.target as HTMLButtonElement).id;
    const library = Librarian.getLibrary();
    const index = library.findIndex(element => element.id === parseInt(articleId));
    if (index < 0) {
      console.log('No article found');
    } else {
      library.splice(index, 1);
      localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(library));
      Librarian.changeLibraryButtonToAdd(articleId);
    }
  
  }

  static changeLibraryButtonToAdd(articleId) {
    const libraryButton = document.getElementById(`${articleId}`);
    if (libraryButton !== null) {
      libraryButton.className = HTML.PARAMETERS.LIBRARY.BUTTONS.ADD.CLASS;
      libraryButton.innerHTML = HTML.TEMPLATES.LIBRARY.BUTTONS.ADD;
      libraryButton.removeEventListener('click', Librarian.removeFromLibrary);
      libraryButton.addEventListener('click', Librarian.addToLibrary);
    } else {
      console.error("Library button not found");
    }
  }

  static changeLibraryButtonToRemove(articleId) {
    const libraryButton = document.getElementById(`${articleId}`);
    if (libraryButton !== null) {
      libraryButton.className = HTML.PARAMETERS.LIBRARY.BUTTONS.REMOVE.CLASS;
      libraryButton.innerHTML = HTML.TEMPLATES.LIBRARY.BUTTONS.REMOVE;
      libraryButton.removeEventListener('click', Librarian.addToLibrary);
      libraryButton.addEventListener('click', Librarian.removeFromLibrary);
    } else {
      console.error("Library button not found");
    }
  }
}
