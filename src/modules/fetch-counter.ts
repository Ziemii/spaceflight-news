import ArticlesLoader from "./articles-loader";

export default class FetchCounter {
  
  #counterContainer: HTMLDivElement = {} as HTMLDivElement;
  #numberOfFetchedArticles = 0;
  #totalNumberOfArticles = 0;
  
  constructor() {
    this.#updateCounter();
  }
  
  #updateCounter() {
    this.#counterContainer.innerHTML = 
    `Fetched ${this.#numberOfFetchedArticles} of ${this.#totalNumberOfArticles}`;
  }
  
  setHTMLContainer(counterContainer: HTMLDivElement) {
    this.#counterContainer = counterContainer;
    this.#updateCounter();
  }

  switchTo(directory: ArticlesLoader) {
    this.#resetCounter();
    this.#setMaxCount(directory.TotalNumberOfAvailableArticles);
    this.setNumberOfFetchedArticles(directory.NumberOfFetchedArticles);
  }
  
  #resetCounter() {
    this.#numberOfFetchedArticles = 0;
    this.#totalNumberOfArticles = 0;
    this.#updateCounter();
  }
  
  #setMaxCount(maxCount: number) {
    this.#totalNumberOfArticles = maxCount;
  }

  setNumberOfFetchedArticles(amountOfFetchedArticles: number) {
    this.#numberOfFetchedArticles = amountOfFetchedArticles;
    this.#updateCounter();  
  }
}