const {DataTypes, NOW} = require('sequelize')
const db = require('../db')

// Model for the "Users" table
const UsersModel = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    registration_date: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
});

module.exports = UsersModel