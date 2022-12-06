import LibrarySorter from '../src/modules/library-sorter';
import { DEFAULTS, HTML } from '../src/modules/constants';
import { TESTS } from './test-constants';
import { JSDOM } from 'jsdom';
import { expect, jest, test } from '@jest/globals';

const testArticleObjects = TESTS.testArticleObjects;

beforeEach(() => {
  global.localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(testArticleObjects));
  global.document = new JSDOM().window.document;
});

test('generateSortingSectionObj()', () => {
  const sortingSection = LibrarySorter.generateSortingSectionObj();
  expect(sortingSection.innerHTML).toBe(HTML.TEMPLATES.SORTING.SECTION);
  expect(sortingSection.className).toBe(HTML.PARAMETERS.SORTING.SECTION.CLASS);
});

test('sortLibraryByTitleAsc()', () => {
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(JSON.stringify(testArticleObjects));
  LibrarySorter.sortLibraryByTitleAsc();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)));
});

test('sortLibraryByTitleDesc()', () => {
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(JSON.stringify(testArticleObjects));
  LibrarySorter.sortLibraryByTitleDesc();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)));
});

test('sortLibraryByDateAsc()', () => {
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(JSON.stringify(testArticleObjects));
  LibrarySorter.sortLibraryByDateAsc();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.publishedAt > b.publishedAt ? 1 : -1)));
});

test('sortLibraryByDateDesc()', () => {
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(JSON.stringify(testArticleObjects));
  LibrarySorter.sortLibraryByDateDesc();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1)));
});

test('addSortingListeners()', () => {
  const sortingSection = LibrarySorter.generateSortingSectionObj();
  global.document.body.appendChild(sortingSection);
  LibrarySorter.addSortingListeners();

  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(JSON.stringify(testArticleObjects));

  const sortByTitleDescButton = document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.DESCENDING.ID);
  sortByTitleDescButton?.click();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)));

  const sortByTitleAscButton = document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.ASCENDING.ID);
  sortByTitleAscButton?.click();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)));

  const sortByDateAscButton = document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.ASCENDING.ID);
  sortByDateAscButton?.click();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.publishedAt > b.publishedAt ? 1 : -1)));

  const sortByDateDescButton = document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.DESCENDING.ID);
  sortByDateDescButton?.click();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1)));

});

test('removeSortingListeners()', () => {
  const sortingSection = LibrarySorter.generateSortingSectionObj();
  global.document.body.appendChild(sortingSection);
  LibrarySorter.addSortingListeners();

  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(JSON.stringify(testArticleObjects));

  const sortByTitleDescButton = document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.DESCENDING.ID);
  const sortByTitleAscButton = document.getElementById(HTML.PARAMETERS.SORTING.BYTITLE.ASCENDING.ID);
  const sortByDateAscButton = document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.ASCENDING.ID);
  const sortByDateDescButton = document.getElementById(HTML.PARAMETERS.SORTING.BYDATE.DESCENDING.ID);

  sortByDateDescButton?.click();
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1)));

  LibrarySorter.removeSortingListeners();

  sortByTitleDescButton?.click();
  sortByTitleAscButton?.click();
  sortByDateAscButton?.click();

  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))
    .toBe(JSON.stringify(testArticleObjects.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1)));
});