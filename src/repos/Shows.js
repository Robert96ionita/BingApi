const Show = require('../models/Show');
const FavouriteRepo = require('../repos/Favourites');

const addNew = (showId, type, callback) => {
    Show.findOrCreate({where: {showId: showId}, defaults: {type: type}})
        .spread((show, created) => {
            return callback(null, show, created);
        }).catch(err => {
            return callback(err);
        });
};

const getShowsByuserId = (userId, callback) => {
    FavouriteRepo.getFavouritesByUserId(userId, (err, favourites) => {
        if (err) {
            return callback(err);
        }
        const favouritesId = [];
        for (let favourite of favourites) {
            favouritesId.push(favourite.dataValues.showId);
        }

        Show.findAll({where: {showId: favouritesId}}).then((shows) => {
            if (!shows) {
                return callback(new Error("No favourite shows found"));
            }

            return callback(null, shows);
        }).catch(err => {
            return callback(err);
        });
    });
};

module.exports = {addNew, getShowsByuserId};