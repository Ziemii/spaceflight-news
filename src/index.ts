import { DEFAULTS } from './modules/constants';
import HomeArticlesLoader from './modules/home-articles-loader';
import LibraryArticlesLoader from './modules/library-articles-loader';
import FetchCounter from './modules/fetch-counter';
import LibrarySorter from './modules/library-sorter';

const homeArticles = new HomeArticlesLoader(DEFAULTS.ARTICLES_PER_PAGE);
const libraryArticles = new LibraryArticlesLoader(DEFAULTS.ARTICLES_PER_PAGE);
const fetchCounter = new FetchCounter();

document.addEventListener('DOMContentLoaded', async() => {
  setHTMLContainers();
  setUpPageNavigation();
  setUpArticlesPerPageInput();
  await goToHomeArticles();
});

function setHTMLContainers() {
  homeArticles.setHTMLContainer(document.querySelector('#articles-container'));
  libraryArticles.setHTMLContainer(document.querySelector('#articles-container'));
  fetchCounter.setHTMLContainer(document.querySelector('#counter'));
}

function setUpPageNavigation() {
  document.getElementById('articles').addEventListener('click', goToHomeArticles);
  document.getElementById('library').addEventListener('click', goToLibraryArticles);
}

function setUpArticlesPerPageInput() {
  document.getElementById('articles-per-page')
    .value = DEFAULTS.ARTICLES_PER_PAGE;
  document.getElementById('articles-per-page')
    .addEventListener('keyup', changeArticlesPerPage);
}

async function goToHomeArticles() {
  await homeArticles.loadFirstPage();
  fetchCounter.switchTo(homeArticles);
  setInfiniteScrollerFor(homeArticles);
}

async function goToLibraryArticles() {
  await libraryArticles.loadFirstPage();
  fetchCounter.switchTo(libraryArticles);
  setInfiniteScrollerFor(libraryArticles);
  LibrarySorter.addSortingListeners();
  makeSortButtonsRefreshLibraryView();
}

function changeArticlesPerPage(event) {
  const newValue = parseInt(event.target.value);
  if(newValue < 1) {
    event.target.value = 1;
    homeArticles.setArticlesPerPage(1);
    libraryArticles.setArticlesPerPage(1);
  } else {
    homeArticles.setArticlesPerPage(newValue);
    libraryArticles.setArticlesPerPage(newValue);
  }
}

function setInfiniteScrollerFor(directory) {
  onscroll = async() => {
    if(isScrollOnBottom()) {
      await directory.loadNextPage();
      fetchCounter.setNumberOfFetchedArticles(directory.NumberOfFetchedArticles);
    }
  };
}

function isScrollOnBottom() {
  if((innerHeight + scrollY) >= document.body.offsetHeight) return true;
  return false;
}

function makeSortButtonsRefreshLibraryView() {
  const sort_buttons = document.getElementsByClassName('sorting-button');
  for (let button of sort_buttons) {
    button.addEventListener('click', goToLibraryArticles);
  }
}


