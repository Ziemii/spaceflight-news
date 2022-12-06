import ArticleCardBuilder from './article-card-builder';
import Article from './article';

export default class ArticlesLoader {

  _articlesPerPage = 0;
  _currentPage = 0;
  _totalNumberOfArticles = 0;
  _numberOfFetchedArticles = 0;
  _articlesContainer: HTMLDivElement;

  constructor(articlesPerPage: number) {
    if(this.constructor === ArticlesLoader){
      throw new Error('Class "ArticlesLoader" cannot be instantiated');
    }
    this._articlesPerPage = articlesPerPage;
    this._currentPage = 1;
  }

  async loadFirstPage() {
    this._numberOfFetchedArticles = 0;
    this._articlesContainer.innerHTML = '';
    this._currentPage = 1;
    this._totalNumberOfArticles = await this._fetchArticlesCount();
    this._addArticlesToView(await this._fetchArticles(this._currentPage));
  }
  
  async loadNextPage() {
    this._currentPage++;
    this._addArticlesToView(await this._fetchArticles(this._currentPage));
  }
  
  async _fetchArticlesCount(): Promise<number> {
    throw new Error('Method "_fetchArticlesCount" must be implemented.');
  }
  
  async _fetchArticles(page: number): Promise<Article[]> {
    page;
    throw new Error('Method "_fetchArticles" must be implemented.');
  }

  _addArticlesToView(articles: Article[]) {
    for (let article of articles) this._addArticleToView(article);
  }

  _addArticleToView(article: Article) {
    const article_card = ArticleCardBuilder.createArticleCard(article);
    this._articlesContainer.append(article_card);
    this._numberOfFetchedArticles++;
  }
  

  _convertPageNumberToQueryStartingPoint(page: number) {
    if(page === 1) {
      return 0;
    } else {
      return (this._articlesPerPage * (page - 1));
    }
  }

  setArticlesPerPage(newValue: number) {
    this._articlesPerPage = newValue;
  }

  setHTMLContainer(articlesContainer: HTMLDivElement) {
    this._articlesContainer = articlesContainer;
  }

  get NumberOfFetchedArticles() {
    return this._numberOfFetchedArticles;
  }

  get TotalNumberOfAvailableArticles() {
    return this._totalNumberOfArticles;
  }
}
