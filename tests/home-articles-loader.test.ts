const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

import ArticleCardBuilder from '../src/modules/article-card-builder';
import HomeArticlesLoader from '../src/modules/home-articles-loader';
import { JSDOM } from 'jsdom'
import { TESTS } from './test-constants';
import { expect, jest, test } from '@jest/globals';

beforeAll(() => {
  setUpGlobalArticlesContainer();
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

function repeatCardArtifactAsString(amount) {
  let string = '';
  for(let i = 0; i < amount; i++) {
    string += articleCardArtifact;
  }
  return string;
}

const testArticlesPerPage = 3;
test('Initial values', () => {
  const homeArticlesLoader = new HomeArticlesLoader(testArticlesPerPage);
  expect(homeArticlesLoader._currentPage).toBe(1);
  expect(homeArticlesLoader._articlesPerPage).toBe(testArticlesPerPage);
});

test('setHTMLContainer(articleContainer)', () => {
  const homeArticlesLoader = new HomeArticlesLoader(0);
  homeArticlesLoader.setHTMLContainer(global.articlesContainer);
  expect(homeArticlesLoader._articlesContainer).toBe(global.articlesContainer);
});

test('setArticlesPerPage(newValue)', () => {
  const homeArticlesLoader = new HomeArticlesLoader(0);
  expect(homeArticlesLoader._articlesPerPage).toBe(0);
  
  homeArticlesLoader.setArticlesPerPage(testArticlesPerPage);
  expect(homeArticlesLoader._articlesPerPage).toBe(testArticlesPerPage);
});


const testArticleObjects = TESTS.testArticleObjects;
test('loadFirstPage()', async () => {
  (fetch as any).mockResponseOnce(JSON.stringify(testArticleObjects.length),{ status: 200 }); 
  (fetch as any).mockResponseOnce(JSON.stringify(testArticleObjects.slice(0, testArticlesPerPage)),{ status: 200 });

  const homeArticlesLoader = new HomeArticlesLoader(testArticlesPerPage);
  homeArticlesLoader.setHTMLContainer(global.articlesContainer);
  
  await homeArticlesLoader.loadFirstPage();
  
  expect(homeArticlesLoader._currentPage).toBe(1);
  expect(homeArticlesLoader._articlesContainer.innerHTML).toBe(repeatCardArtifactAsString(testArticlesPerPage));
  expect(homeArticlesLoader._numberOfFetchedArticles).toBe(testArticlesPerPage);
  expect(homeArticlesLoader._totalNumberOfArticles).toBe(testArticleObjects.length);
});

test('loadNextPage()', async () => {
  (fetch as any).mockResponseOnce(JSON.stringify(testArticleObjects.length),{ status: 200 });
  (fetch as any).mockResponseOnce(JSON.stringify(testArticleObjects.slice(0, testArticlesPerPage)),{ status: 200 });
  (fetch as any).mockResponseOnce(JSON.stringify(testArticleObjects.slice(testArticlesPerPage, testArticlesPerPage * 2)),{ status: 200 });

  const homeArticlesLoader = new HomeArticlesLoader(testArticlesPerPage);
  homeArticlesLoader.setHTMLContainer(global.articlesContainer);

  await homeArticlesLoader.loadFirstPage();
  await homeArticlesLoader.loadNextPage();

  expect(homeArticlesLoader._currentPage).toBe(2);
  expect(homeArticlesLoader._articlesContainer.innerHTML).toBe(repeatCardArtifactAsString(testArticlesPerPage * 2));
  expect(homeArticlesLoader._numberOfFetchedArticles).toBe(testArticlesPerPage * 2);
  expect(homeArticlesLoader._totalNumberOfArticles).toBe(testArticleObjects.length);
});
