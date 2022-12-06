import ArticleCardBuilder from '../src/modules/article-card-builder';
import LibraryArticlesLoader from '../src/modules/library-articles-loader';
import LibrarySorter from '../src/modules/library-sorter';
import { JSDOM } from 'jsdom';
import { TESTS } from './test-constants';
import { expect, jest, test } from '@jest/globals';



const testArticleObjects = TESTS.testArticleObjects;

beforeAll(() => {
  setUpGlobalArticlesContainer();
  global.localStorage.setItem('library', JSON.stringify(testArticleObjects));
});
  
function setUpGlobalArticlesContainer() {
  global.document = new JSDOM().window.document;
  const articlesContainer = document.createElement('div');
  document.body.appendChild(articlesContainer);
  global.articlesContainer = articlesContainer;
}
  
jest.mock('../src/modules/article-card-builder');
const articleCardArtifact = 'O';
ArticleCardBuilder.createArticleCard = jest.fn().mockReturnValue(articleCardArtifact) as jest.Mock;

jest.mock('../src/modules/library-sorter');
LibrarySorter.generateSortingSectionObj = jest.fn().mockReturnValue('') as jest.Mock;
  
function repeatCardArtifactAsString(amount) {
  let string = '';
  for(let i = 0; i < amount; i++) {
    string += articleCardArtifact;
  }
  return string;
}

const testArticlesPerPage = 3;
  
test('Initial values', () => {
  const libraryArticlesLoader = new LibraryArticlesLoader(testArticlesPerPage);
  expect(libraryArticlesLoader._currentPage).toBe(1);
  expect(libraryArticlesLoader._articlesPerPage).toBe(testArticlesPerPage);
});
  
test('setHTMLContainer(articleContainer)', () => {
  const libraryArticlesLoader = new LibraryArticlesLoader(0);
  libraryArticlesLoader.setHTMLContainer(global.articlesContainer);
  expect(libraryArticlesLoader._articlesContainer).toBe(global.articlesContainer);
});
  
test('setArticlesPerPage(newValue)', () => {
  const libraryArticlesLoader = new LibraryArticlesLoader(0);
  expect(libraryArticlesLoader._articlesPerPage).toBe(0);
  libraryArticlesLoader.setArticlesPerPage(testArticlesPerPage);
  expect(libraryArticlesLoader._articlesPerPage).toBe(testArticlesPerPage);
});
  
test('loadFirstPage()', async () => {
  
  const libraryArticlesLoader = new LibraryArticlesLoader(testArticlesPerPage);
  libraryArticlesLoader.setHTMLContainer(global.articlesContainer);
    
  await libraryArticlesLoader.loadFirstPage();
  
  expect(libraryArticlesLoader._articlesContainer.innerHTML).toBe(repeatCardArtifactAsString(testArticlesPerPage));
  expect(libraryArticlesLoader._currentPage).toBe(1);
  expect(libraryArticlesLoader._numberOfFetchedArticles).toBe(testArticlesPerPage);
  expect(libraryArticlesLoader._totalNumberOfArticles).toBe(testArticleObjects.length);
});
  
test('loadNextPage()', async () => {
  const libraryArticlesLoader = new LibraryArticlesLoader(testArticlesPerPage);
  libraryArticlesLoader.setHTMLContainer(global.articlesContainer);
  
  await libraryArticlesLoader.loadFirstPage();
  await libraryArticlesLoader.loadNextPage();

  expect(libraryArticlesLoader._articlesContainer.innerHTML).toBe(repeatCardArtifactAsString(testArticlesPerPage * 2));
  expect(libraryArticlesLoader._currentPage).toBe(2);
  expect(libraryArticlesLoader._numberOfFetchedArticles).toBe(testArticlesPerPage * 2);
  expect(libraryArticlesLoader._totalNumberOfArticles).toBe(testArticleObjects.length);
});