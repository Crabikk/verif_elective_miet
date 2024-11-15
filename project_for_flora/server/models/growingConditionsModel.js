const {DataTypes} = require('sequelize')
const db = require('../db')
const PlantsModel = require('./plantsModel')

// Model for the "Growing_Conditions" table
const GrowingConditionsModel = db.define('growing_conditions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PlantsModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    light_level: {
        type: DataTypes.STRING
    },
    humidity: {
        type: DataTypes.STRING
    },
    temperature: {
        type: DataTypes.NUMBER,
        validate: {
            min: -50,
            max: 50
        }
    }
});

module.exports = GrowingConditionsModel