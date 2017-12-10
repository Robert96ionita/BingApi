const request = require('request-promise');

class RequestFactory {
    constructor(options) {
        this.uri = options.uri;
        this.query = options.qs || null;
        this.json = options.json || true;
        this.method = options.method || 'GET';
    }

    setQuery(query) {
        this.query = query;
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
    // makeRecursiveRequest(callback) {
    //     this.makeRequest((err, response) => {
    //         if (err) {
    //             return callback(err);
    //         }
    //
    //         let results = {};
    //         Object.assign(results, response);
    //         if (results.pages !== 1) {
    //             for (let i = 2; i <= result.pages; i++) {
    //                 let newQuery = {...this.query, page: i};
    //                 this.setQuery(newQuery);
    //                 this.makeRequest((err, response) => {
    //                     return Object.assign(results, response);
    //                 });
    //             }
    //         }
    //
    //         return callback(null, results);
    //     });
    // }

}

module.exports = RequestFactory;