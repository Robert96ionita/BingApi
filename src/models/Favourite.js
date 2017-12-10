const connection = require('../models/index').sequelize;
const DataTypes = require('../models/index').DataTypes;
const User = require('../models/User');
const Show = require('./Show');

const Favourite = connection.define('Favourite', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        get() {
            return this.getDataValue('userId');
        }
    },
    showId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Show,
            key: 'showId'
        },
        get() {
            return this.getDataValue('showId');
        }
    }
});

module.exports = Favourite;
