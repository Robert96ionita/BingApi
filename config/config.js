const keys = require('./keys');

module.exports = {
    database: {
        development: {
            username: keys.database.User,
            password: keys.database.Password,
            database: keys.database.Name,
            extras: {
                host: "localhost",
                dialect: "mysql"
            }
        }
    },
    api: {
        development: {
            hostname: "https://api.themoviedb.org/3",
            port: null,
            headers: {},
            key: keys.API.key
        },
        methods: {
            GET: "GET",
            POST: "POST"
        },
        images: {
            secure_base_url: "https://image.tmdb.org/t/p/",
            poster_sizes: {
                ultraSmall: "w92",
                small: "w154",
                medium: "w185",
                high: "w500",
                ultraHigh: "w780",
                original: "original"
            },
        }
    }
};