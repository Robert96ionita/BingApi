const Favourite = require('../models/Favourite');

const addToFavourites = (userId, showId, callback) => {
    Favourite.findOrCreate({where: {userId: userId, showId: showId}})
        .then(result => {
            return callback(null, result[0]);
        }).catch(err => {
            console.log(err.message);
            return callback(err);
        });
};

const getFavouritesByUserId = (userId, callback) => {
    Favourite.findAll({attributes: ['showId'], where: {userId: userId}}).then(favourites => {
        if (!favourites) {
            return callback(new Error("No favourites found"));
        }

        return callback(null, favourites);
    }).catch(err => {
        return callback(err);
    });
};

module.exports = {addToFavourites, getFavouritesByUserId};