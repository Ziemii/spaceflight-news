import  ArticlesLoader from './articles-loader';
import Librarian from './librarian';
import LibrarySorter from './library-sorter';
import { DEFAULTS, HTML } from './constants';
import Article from './article';

export default class LibraryArticlesLoader extends ArticlesLoader {


  constructor(articlesPerPage: number) {
    super(articlesPerPage);
  }
  
  async loadFirstPage() {
    this._numberOfFetchedArticles = 0;
    this._articlesContainer.innerHTML = '';
    this._currentPage = 1;
    this._addSorter();
    this._totalNumberOfArticles = await this._fetchArticlesCount();
    this._addArticlesToView(await this._fetchArticles(this._currentPage));
  }
  
  _addSorter() {
    const sortingSection = LibrarySorter.generateSortingSectionObj();
    this._articlesContainer.append(sortingSection);
  }

  async _fetchArticlesCount() {
    const library = Librarian.getLibrary();
    if (library) {
      return library.length;
    } else {
      return 0;
    }
  }
  
  async _fetchArticles(page: number) {
    const library = Librarian.getLibrary();
    if(library === null || library.length === 0){
      this._showEmptyLibraryScreen();
      return [];
    } else {
      const queryStartingPoint = this._convertPageNumberToQueryStartingPoint(page);
      const queryEndPoint = queryStartingPoint + this._articlesPerPage;
      return library.slice(queryStartingPoint, queryEndPoint);
    }
  }

  _showEmptyLibraryScreen() {
    const emptyLibraryDiv = document.createElement('div');
    emptyLibraryDiv.className = HTML.PARAMETERS.LIBRARY.EMPTY.CLASS;
    emptyLibraryDiv.innerHTML = HTML.TEMPLATES.LIBRARY.EMPTY;
    this._articlesContainer.append(emptyLibraryDiv);
  }
}


