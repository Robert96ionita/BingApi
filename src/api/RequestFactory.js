const request = require('request-promise');

class RequestFactory {
    constructor(options) {
        this.uri = options.uri;
        this.query = options.qs || null;
        this.json = options.json || true;
        this.method = options.method || 'GET';
    }

    setQuery(query) {
        Object.assign(this.query, query);
    }

    makeRequest(callback) {
        request({uri: this.uri, method: this.method, qs: this.query, json: this.json})
            .then(function (response) {
                return callback(null, response);
            })
            .catch(function (err) {
                return callback(err);
            });
    }

    //TODO finish and clean this method
    makeRecursiveRequest(callback) {
        this.makeRequest((err, response) => {
            if (err) {
                return callback(err);
            }

            let finalResponse = {};
            Object.assign(finalResponse, response);
            if (finalResponse.total_pages !== 1) {
                for (let i = 2; i <= finalResponse.total_pages; i++) {
                    this.setQuery(Object.assign({}, this.query, {page: i}));

                    request({uri: this.uri, method: this.method, qs: this.query, json: this.json})
                        .then(function (response) {
                            const results = [...finalResponse.results, ...response.results];
                            Object.assign(finalResponse.results, {results: results}, {page: i});
                            console.log(finalResponse.results.length, finalResponse.page);
                        })
                        .catch(function (err) {

                        });
                }
            }
            // console.log(finalResponse.results.length, finalResponse.page);

            return callback(null, this.temp);
        });
    }

}

module.exports = RequestFactory;