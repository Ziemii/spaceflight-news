import  Librarian  from './librarian';
import { HTML } from './constants';
import Article from './article';

export default class ArticleCardBuilder {
  static createArticleCard(article: Article) {
    
    const newArticleCard = document.createElement('div');
    newArticleCard.className = HTML.PARAMETERS.ARTICLE.CLASS;

    const cardBody = document.createElement('div');
    cardBody.className = HTML.PARAMETERS.ARTICLE.CARD_BODY.CLASS;

    const articleImage = document.createElement('img');
    articleImage.src = article.imageUrl;
    articleImage.alt = `Image for ${article.title}`;

    const articleTitle = document.createElement('div');
    articleTitle.className = HTML.PARAMETERS.ARTICLE.TITLE.CLASS;
    articleTitle.innerHTML = article.title;

    const articleFrom = document.createElement('div');
    articleFrom.className = HTML.PARAMETERS.ARTICLE.FROM.CLASS;
    articleFrom.innerHTML = HTML.TEMPLATES.ARTICLE.FROM + article.newsSite;

    const publishedOn = document.createElement('div');
    publishedOn.className = HTML.PARAMETERS.ARTICLE.PUBLISHED.CLASS;
    const articleDate = new Date(article.publishedAt);
    const moreReadableDate = articleDate.toDateString();
    publishedOn.innerHTML = HTML.TEMPLATES.ARTICLE.PUBLISHED + moreReadableDate;

    const articleSummary = document.createElement('div');
    articleSummary.className = HTML.PARAMETERS.ARTICLE.SUMMARY.CLASS;
    articleSummary.innerHTML = `${article.summary.slice(0, 199)}`;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = HTML.PARAMETERS.ARTICLE.BUTTONS.CLASS;

    const readButton = document.createElement('button');
    readButton.className = HTML.PARAMETERS.ARTICLE.BUTTONS.READ_BUTTON.CLASS;
    readButton.innerHTML = HTML.TEMPLATES.ARTICLE.BUTTONS.READ_BUTTON;
    readButton.addEventListener('click', () => {
      window.open(`${article.url}`);
    });

    const libraryButton = Librarian.createLibraryButton(article);

    buttonsContainer.append(
      readButton, 
      libraryButton);
    cardBody.append(
      articleImage, 
      articleTitle, 
      articleFrom, 
      publishedOn, 
      articleSummary,
      buttonsContainer);
    newArticleCard.append(cardBody);
    return newArticleCard;
  }
}
