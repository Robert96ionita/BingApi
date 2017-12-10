const APIconfig = require('../../config/config').api;
const request = require('request-promise');
const RequestFactory = require('../api/RequestFactory');
const middleware = require('../api/Middleware');
const ShowsRepo = require('../repos/Shows');
const FavouritesRepo = require('../repos/Favourites');

module.exports = (app) => {
    app.get('/api/search/shows', (req, res) => {
        const options = {
            uri: APIconfig.development.hostname + '/search/tv',
            qs: {
                api_key: APIconfig.development.key,
                query: req.query.name
            },
            json: true
        };

        request(options).then(function (response) {
                res.json(middleware.shows(response));
            })
            .catch(function (err) {
                console.log(err.message);
                res.status(404).send("Nothing found");
            });
    });

    app.get('/api/show/:id', (req, res) => {
        const options = {
            uri: APIconfig.development.hostname + '/tv/' + req.params.id,
            qs: {
                api_key: APIconfig.development.key,
                language: 'en-US'
            },
            json: true
        };

        request(options).then(function (response) {
                res.json(middleware.show(response));
            })
            .catch((err) => {
                console.log(err.message);
                res.status(404).send("Nothing found");
            })
    });

    app.get('/api/show/:id/season/:number', (req, res) => {
        const options = {
            uri: APIconfig.development.hostname + '/tv/' + req.params.id + '/season/' + req.params.number,
            qs: {
                api_key: APIconfig.development.key
            },
            json: true
        };
        console.log(options.uri);

        request(options).then(function (response) {
            res.json(middleware.season(response));
        })
            .catch((err) => {
                console.log(err.message);
                res.status(404).send("Nothing found");
            })
    });

    app.get('/api/user/:id/favourite-shows/today', (req, res) => {
        ShowsRepo.getShowsByuserId(req.params.id, (err, shows) => {
            if (err) {
                res.status(400).json(err.message);
            }

            let showIds = [];
            for (let show of shows) {
                showIds.push(show.showId);
            }
            let requestFactory = new RequestFactory({
                uri: APIconfig.development.hostname + '/tv/airing_today',
                qs: {
                    api_key: APIconfig.development.key,
                    page: 1
                },
                json: true
            });

            // requestFactory.makeRecursiveRequest((err, response) => {
            //     if (err) {
            //         res.status(400).json(err.message);
            //     }
            //     res.send(response);
            // });
            requestFactory.makeRequest((err, response) => {
                if (err) {
                    res.status(400).json(err.message);
                }

                let results = middleware.shows(response, showIds);
                if (results.pages !== 1) {
                    requestFactory.setQuery({});
                }

                res.json(results);
            });
        });
    });

    app.post('/api/favourite', (req, res) => {
        const userId = req.body.userId;
        const showId = req.body.showId;

        FavouritesRepo.addToFavourites(userId, showId, (err, favourite) => {
            if (err) {
                res.status(400).json("Cannot add to favourites");
            }

            res.json(favourite);
        });
    });

    app.post('/api/tv-show', (req, res) => {
        const showId = req.body.showId;
        const type = req.body.type;
        ShowsRepo.addNew(showId, type, (err, show, created) => {
            if (err) {
                res.status(400).send(err.message);
            }

            if (show) {
                res.json(show);
            }
        });
    });
};