const connection = require('../models/index').sequelize;
const DataTypes = require('../models/index').DataTypes;

const Show = connection.define('Show', {
    showId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        get() {
            return this.getDataValue('showId');
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('type');
        },
        set(type) {
            return this.setDataValue('type', type)
        }
    }
});


module.exports = Show;