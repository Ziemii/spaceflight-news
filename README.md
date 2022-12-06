# Spaceflight news by Łukasz Ziemacki

mail: lukasz.ziemack@gmail.com

# Setup
```
\spaceflight-news> npm install 
\spaceflight-news> npm run spaceflight

> parcel src/index.html
Server running at http://localhost:1234
```

# About
Application that communicates with free API (https://spaceflightnewsapi.net/) and have the following functionalities:

- There is Infinite Scroll pagination.
- At the top of the page is sticked counter, displaying how many articles are fetched out of total.
- Each article is displayed as a card and contain information such as title, newsSite, publishedAt date, summary, button "Read article" which works as a hyperlink to an article, and button "Add to Library" which saves article in a library.
- The is separate page "Library" to display a list of saved articles.
- Articles in Library are saved after leaving the page.
- Allows sorting Library ascending and descending by publishedAt date and by title.

# Tests 
```
\spaceflight-news> npm run testspaceflight
```
