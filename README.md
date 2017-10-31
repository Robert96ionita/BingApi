# Goal

_Using this web application a user can search for anything on the web and then save the results for future use.
The search will be executed using Bing's Search Engine._

# User Interface

## Single page app
* Login/Register view
* Header menu for switching between views (search view and saved searches view) or performing logout
* Input for entering the desired search parameters
* Separate view for displaying the results based on the search params with the characteristic that every result can be marked as saved
* List containing all the previously saved searches

## Which technologies ?
React and Redux for structuring the app and connecting user actions . 

Bootstrap css for a better design . 

Webpack to bundle the code . 

# Backend 

## External API
Bing Search API V7 for fetching data
ex: GET https://api.cognitive.microsoft.com/bing/v7.0/search[?q][&count][&offset][&mkt][&safesearch]

## Requests
* POST api/save-search/:result
* GET api/search/:params -> making a request to get all the results for the specified params
* POST /login -> providing the login params
* POST /register -> providing the registration details
* GET /logout -> deleting the session

## Technologies 
* NodeJs with Express framework
* MySQL database
* Helper modules like: router, mysql, request, morgan, webpack etc...


