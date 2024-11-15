const {DataTypes, NOW} = require('sequelize')
const db = require('../db')

// Model for the "Habitats" table
const HabitatsModel = db.define('habitats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    habitat_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }
});

module.exports = HabitatsModel