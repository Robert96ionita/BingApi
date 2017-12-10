'use strict';

const Sequelize = require('sequelize');
const config    = require('../../config/config').database.development;
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config.extras);
sequelize.authenticate().then(() => {
    console.log("Database connection successful!");
    sequelize.sync({
        logging: console.log
    }).catch(err => {
        console.log(err.message);
    });
}).catch(() => {
    console.log("Error - connecting to the database failed!");
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = Sequelize.DataTypes;

module.exports = db;