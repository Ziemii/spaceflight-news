const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();
import {TESTS} from './test-constants';
import {DEFAULTS, HTML} from '../src/modules/constants';
import { JSDOM } from 'jsdom';
import Librarian from '../src/modules/librarian';
import { expect, jest, test } from '@jest/globals';

beforeAll(() => {
  global.document = new JSDOM().window.document;
  global.testArticle = TESTS.testArticleObject;
  global.testEvent = {target: {id: global.testArticle.id}};
});

beforeEach(() => {
  global.document.body.innerHTML = '';
  global.localStorage.clear();
});

test('addToLibrary()', async () => {
  const fetchResultsSpy = jest.spyOn(Librarian, 'fetchArticle')
    .mockImplementation(() => {return global.testArticle;});
  const changeLibraryButtonToRemoveSpy = jest.spyOn(Librarian, 'changeLibraryButtonToRemove')
    .mockImplementation(() => {return null;});
  
  expect(global.localStorage.length).toBe(0);
  
  await Librarian.addToLibrary(global.testEvent);
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(`[${JSON.stringify(global.testArticle)}]`);

  fetchResultsSpy.mockRestore();
  changeLibraryButtonToRemoveSpy.mockRestore();

});

test('removeFromLibrary()', () => {
  
  global.localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify(global.testArticle));
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(JSON.stringify(global.testArticle));
  
  const getLibrarySpy = jest.spyOn(Librarian, 'getLibrary')
    .mockImplementation(() => {
      // @ts-ignore
      return Array(JSON.parse(localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME))) || [];
    });
  const changeLibraryButtonToAddSpy = jest.spyOn(Librarian, 'changeLibraryButtonToAdd')
    .mockImplementation(() => {return null;});
  Librarian.removeFromLibrary(global.testEvent);
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe('[]');
  
  getLibrarySpy.mockRestore();
  changeLibraryButtonToAddSpy.mockRestore();
  
});

test('createLibraryButton(article)', () => {
  let libraryButton = Librarian.createLibraryButton(global.testArticle);
  expect(parseInt(libraryButton.id)).toBe(global.testArticle.id);
  expect(libraryButton.className).toBe(HTML.PARAMETERS.LIBRARY.BUTTONS.ADD.CLASS);
  expect(libraryButton.innerHTML).toBe(HTML.TEMPLATES.LIBRARY.BUTTONS.ADD);
  
  global.localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify([global.testArticle]));
  libraryButton = Librarian.createLibraryButton(global.testArticle);
  expect(parseInt(libraryButton.id)).toBe(global.testArticle.id);
  expect(libraryButton.className).toBe(HTML.PARAMETERS.LIBRARY.BUTTONS.REMOVE.CLASS);
  expect(libraryButton.innerHTML).toBe(HTML.TEMPLATES.LIBRARY.BUTTONS.REMOVE);
});

test('getLibrary()', () => {
  global.localStorage.setItem('library', JSON.stringify([global.testArticle]));
  expect(global.localStorage.getItem(DEFAULTS.LIBRARY_KEY_NAME)).toBe(`[${JSON.stringify(global.testArticle)}]`);
  
  const library = Librarian.getLibrary();
  expect(library).toStrictEqual([global.testArticle]);
});

test('isArticleInLibrary(article)', () => {
  expect(Librarian.isArticleInLibrary(global.testArticle)).toBe(false);
  global.localStorage.setItem(DEFAULTS.LIBRARY_KEY_NAME, JSON.stringify([global.testArticle]));
  expect(Librarian.isArticleInLibrary(global.testArticle)).toBe(true);
});

test('fetchArticle(articleId)', async () => {
  (fetch as any).mockResponseOnce(JSON.stringify(global.testArticle),{ status: 200 });
  const article = await Librarian.fetchArticle(1);
  expect(article).toStrictEqual(global.testArticle);
});

test('changeLibraryButtonToAdd(articleId)', () => {
  const libraryButton = document.createElement('div');
  libraryButton.id = global.testArticle.id;
  document.body.append(libraryButton);
  Librarian.changeLibraryButtonToAdd(global.testArticle.id);
  expect(libraryButton.className).toBe(HTML.PARAMETERS.LIBRARY.BUTTONS.ADD.CLASS);
  expect(libraryButton.innerHTML).toBe(HTML.TEMPLATES.LIBRARY.BUTTONS.ADD);
});

test('changeLibraryButtonToRemove(articleId)', () => {
  const libraryButton = document.createElement('div');
  libraryButton.id = global.testArticle.id;
  document.body.append(libraryButton);
  Librarian.changeLibraryButtonToRemove(global.testArticle.id);
  expect(libraryButton.className).toBe(HTML.PARAMETERS.LIBRARY.BUTTONS.REMOVE.CLASS);
  expect(libraryButton.innerHTML).toBe(HTML.TEMPLATES.LIBRARY.BUTTONS.REMOVE);
});