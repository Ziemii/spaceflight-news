import Article from './article';
import ArticlesLoader from './articles-loader';
import { DEFAULTS } from './constants';

export default class HomeArticlesLoader extends ArticlesLoader {
  
  constructor(articlesPerPage: number) {
    super(articlesPerPage);
  }
  
  async _fetchArticlesCount() {
    const numberOfAllArticles = await fetch(DEFAULTS.API_ADDRESS + '/count')
      .then(response => {
        if(!response.ok) return Promise.reject('Couldn\'t get articles count');
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
    return parseInt(numberOfAllArticles);
  }
  
  async _fetchArticles(page: number) {
    const queryStartingPoint = this._convertPageNumberToQueryStartingPoint(page);
    const articles: Article[] = await fetch(
      DEFAULTS.API_ADDRESS + '?' +
      `_limit=${this._articlesPerPage}&` +
      `_start=${queryStartingPoint}`)
      .then(response => {
        if(!response.ok) return Promise.reject('Couldn\'t get articles');
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
    return articles;
  }
}
