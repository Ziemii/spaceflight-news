import FetchCounter from '../src/modules/fetch-counter';
import { JSDOM } from 'jsdom';
import {expect, jest, test} from '@jest/globals';
import ArticlesLoader from '../src/modules/articles-loader';
beforeAll(() => {
  setUpGlobalCounterContainer();
});

function setUpGlobalCounterContainer() {
  const document = new JSDOM().window.document;
  const counterContainer = document.createElement('div');
  document.body.appendChild(counterContainer);
  global.counterContainer = counterContainer;
}

test('setHtmlContainer(counterContainer)', () => {
  const fetchCounter =  new FetchCounter();
  fetchCounter.setHTMLContainer(global.counterContainer);
  
  expect(global.counterContainer.innerHTML).toBe('Fetched 0 of 0');
});

test('switchTo(directory)', () => {
  const testDirectory = {
    TotalNumberOfAvailableArticles: 999,
    NumberOfFetchedArticles: 777,
  };
  const fetchCounter =  new FetchCounter();
  fetchCounter.setHTMLContainer(global.counterContainer);
  fetchCounter.switchTo(testDirectory as ArticlesLoader);

  expect(global.counterContainer.innerHTML)
    .toBe(`Fetched ${testDirectory.NumberOfFetchedArticles} of ${testDirectory.TotalNumberOfAvailableArticles}`);
});

test('setNumberOfFetchedArticles()',() => {
  const testNumber = 999;
  const fetchCounter =  new FetchCounter();
  fetchCounter.setHTMLContainer(global.counterContainer);
  fetchCounter.setNumberOfFetchedArticles(testNumber);

  expect(global.counterContainer.innerHTML).toBe(`Fetched ${testNumber} of 0`);
});
