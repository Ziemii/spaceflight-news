export const DEFAULTS = Object.freeze({
  ARTICLES_PER_PAGE : 15,
  LIBRARY_KEY_NAME : 'library',
  API_ADDRESS : 'https://api.spaceflightnewsapi.net/v3/articles',
});

export const HTML = Object.freeze({
  TEMPLATES : {
    SORTING : {
      SECTION : `
        <span class="sort-text">Title:</span>
        <button class="sorting-button" id="by-title-asc">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <button class="sorting-button" id="by-title-desc">
          <i class="fa-solid fa-arrow-down"></i>
        </button>
        <span class="sort-text">Date:</span>
        <button class="sorting-button" id="by-date-asc">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <button class="sorting-button" id="by-date-desc">
          <i class="fa-solid fa-arrow-down"></i>
        </button>
      `,
    },
    LIBRARY : {
      EMPTY : 'No articles in library. Add some!',
      BUTTONS : {
        ADD : 'Add to library',
        REMOVE : 'Remove from library'
      }
    },
    ARTICLE : {
      FROM : 'From: ',
      PUBLISHED : 'Published on: ',
      BUTTONS : {
        READ_BUTTON : 'Read article <i class="fa-solid fa-newspaper"></i>'
      }
    } 
  },
  PARAMETERS : {
    SORTING : {
      SECTION : {
        CLASS : 'sorting-section'
      },
      BYTITLE : {
        ASCENDING : {
          ID: 'by-title-asc'
        },
        DESCENDING : {
          ID: 'by-title-desc'
        }
      },
      BYDATE : {
        ASCENDING : {
          ID : 'by-date-asc'
        },
        DESCENDING : {
          ID : 'by-date-desc'
        }
      }
    },
    ARTICLE : {
      CLASS : 'card',
      CARD_BODY : {
        CLASS : 'card-body',
      },
      TITLE : {
        CLASS : 'title'
      },
      FROM : {
        CLASS : 'from'
      },
      PUBLISHED : {
        CLASS : 'date'
      },
      SUMMARY : {
        CLASS : 'summary'
      },
      BUTTONS : {
        CLASS : 'buttons-container',
        READ_BUTTON : {
          CLASS : 'read-button'
        }
      }
    },
    LIBRARY : {
      EMPTY : {
        CLASS : 'empty-library'
      },
      BUTTONS : {
        ADD : {
          CLASS : 'library-button library-add'
        },
        REMOVE : {
          CLASS : 'library-button library-remove'
        }
      }
    }
  }
});
