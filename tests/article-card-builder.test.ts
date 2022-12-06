/**
 * @jest-environment jsdom
 */

import ArticleCardBuilder from '../src/modules/article-card-builder';
import { TESTS } from './test-constants';

beforeAll(() => {
  global.testArticle = TESTS.testArticleObject; 
});

test('createArticleCard(article)', () => {
  const articleCard = ArticleCardBuilder.createArticleCard(global.testArticle);
  expect(articleCard).not.toBeNull();
  expect(articleCard.hasChildNodes()).toBeTruthy();

  const cardBody = articleCard.firstChild as HTMLElement;
  expect(cardBody).not.toBeNull();
  expect(cardBody.hasChildNodes()).toBeTruthy();

  const bodyElements = cardBody.childNodes as any;
  
  const articleImageSrc = bodyElements[0].getAttribute('src');
  expect(articleImageSrc).toBe(global.testArticle.imageUrl);
  
  const articleTitle = bodyElements[1];
  expect(articleTitle.innerHTML).toBe(global.testArticle.title);
  
  const articleFrom = bodyElements[2];
  expect(articleFrom.innerHTML).toBe('From: '+ global.testArticle.newsSite);
  
  const publishedOn = bodyElements[3];
  const moreReadableDate = new Date(global.testArticle.publishedAt).toDateString();
  expect(publishedOn.innerHTML).toBe('Published on: ' + moreReadableDate);
  
  const articleSummary = bodyElements[4];
  expect(articleSummary.innerHTML).toBe(global.testArticle.summary);

  const buttonsContainer = bodyElements[5];
  expect(buttonsContainer.hasChildNodes).toBeTruthy();

  const readButton = buttonsContainer.firstChild;
  expect(readButton).not.toBeNull();
  
  const libraryButton = buttonsContainer.lastChild;
  expect(libraryButton.id).toBe(String(global.testArticle.id));
});