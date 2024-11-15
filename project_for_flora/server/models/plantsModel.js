const {DataTypes, NOW} = require('sequelize')
const db = require('../db')

// Model for the "Plants" table
const PlantsModel = db.define('plants', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    plant_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    scientific_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    family: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    date_added: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
});

module.exports = PlantsModel







