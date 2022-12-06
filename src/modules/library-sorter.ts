import { DEFAULTS, HTML } from './constants';
import Librarian from './librarian';


export default class LibrarySorter {

  static generateSortingSectionObj() {
    const sortingSection = document.createElement('div');
    sortingSection.className = HTML.PARAMETERS.SORTING.SECTION.CLASS;
    sortingSection.innerHTML = HTML.TEMPLATES.SORTING.SECTION;
    return sortingSection;
  }

  static addSortingListeners() {
    document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.ASCENDING.ID
    )?.addEventListener('click', LibrarySorter.sortLibraryByTitleAsc);
    document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.DESCENDING.ID
    )?.addEventListener('click', LibrarySorter.sortLibraryByTitleDesc);
    document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.ASCENDING.ID
    )?.addEventListener('click', LibrarySorter.sortLibraryByDateAsc);
    document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.DESCENDING.ID
    )?.addEventListener('click', LibrarySorter.sortLibraryByDateDesc);
  }

  static removeSortingListeners() {
    document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.ASCENDING.ID
    )?.removeEventListener('click', LibrarySorter.sortLibraryByTitleAsc);
    document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.DESCENDING.ID
    )?.removeEventListener('click', LibrarySorter.sortLibraryByTitleDesc);
    document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.ASCENDING.ID
    )?.removeEventListener('click', LibrarySorter.sortLibraryByDateAsc);
    document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.DESCENDING.ID
    )?.removeEventListener('click', LibrarySorter.sortLibraryByDateDesc);
  }

  static sortLibraryByTitleAsc() {
    const library = Librarian.getLibrary();
    library.sort((a, b) => {
      const A = a.title.toUpperCase();
      const B = b.title.toUpperCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
    localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(library));
  }

  static sortLibraryByTitleDesc() {
    const library = Librarian.getLibrary();
    library.sort((a, b) => {
      const A = a.title.toUpperCase();
      const B = b.title.toUpperCase();
      if (A < B) return 1;
      if (A > B) return -1;
      return 0;
    });
    localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(library));
  }

  static sortLibraryByDateAsc() {
    const library = Librarian.getLibrary();
    library.sort((a, b) => {
      const A = a.publishedAt;
      const B = b.publishedAt;
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
    localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(library));
  }

  static sortLibraryByDateDesc() {
    const library = Librarian.getLibrary();
    library.sort((a, b) => {
      const A = a.publishedAt;
      const B = b.publishedAt;
      if (A < B) return 1;
      if (A > B) return -1;
      return 0;
    });
    localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(library));
  }
}