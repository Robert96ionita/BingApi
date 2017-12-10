"use strict";

const connection = require('../models/index').sequelize;
const DataTypes = require('../models/index').DataTypes;

const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    name: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('name');
        },
        set(name) {
            return this.setDataValue('name', name)
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('email');
        },
        set(email) {
            return this.setDataValue('email', email)
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('password');
        },
        set(pass) {
            return this.setDataValue('password', pass)
        }
    }
});

module.exports = User;