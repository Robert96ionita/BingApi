# Goal

_Using this web application a user can search for TV-shows and add them to her/his personal collection. Every day a list with airing TV-shows will be displayed based on prefferences.

# How to install

* Clone this repo
* cd -directory
* npm install
* install mysql and create a database
* to configure the database and the api key create a file called keys.js inside /config directory
* the keys.js file should have this structure
`module.exports = {
    secret: "random secret",
    database: {
        User: "db user",
        Password: "obviously",
        Name: "db name"
    },
    API: {
        key: "API KEY - from https://www.themoviedb.org/settings/api"
    }
};`
* to run the server user the command: npm start

# User Interface

## Single page app
* Login/Register view
* Header menu for switching between views (search view and saved searches view) or performing logout
* Input for entering the desired search parameters
* Separate view for displaying the results based on the search params with the characteristic that every result can be marked as saved
* List containing favourite TV-shows

## Which technologies ?
React and Redux for structuring the app and connecting user actions . 

Bootstrap css for a better design . 

Webpack to bundle the code . 

# Backend 

## External API
The movie DB - https://developers.themoviedb.org/3
ex: GET https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US

## Requests
* GET /api/search/shows?name=<<Desired name>> - Search for a tv-show by name
* GET /api/show/:id - Search for a specific tv-show by id
* GET /api/show/:id/season/:number - Search for a specific season of a tv-show
* GET /api/user/:id/favourite-shows/today - Get airing tv-shows for today from the favourite list
* POST /api/favourite - Add a favourite tv-show
* POST /api/tv-show - Add a tv-show
* POST /login -> providing the login params
* POST /register -> providing the registration details
* GET /logout -> deleting the session

## Technologies 
* NodeJs with Express framework
* MySQL database
* Helper modules like: router, mysql, request, morgan, webpack etc...


