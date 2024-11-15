const {DataTypes, NOW} = require('sequelize')
const db = require('../db')
const PlantsModel = require('./plantsModel')
const UsersModel = require('./usersModel')

// Model for the "Observations" table
const ObservationsModel = db.define('observations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UsersModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    plant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PlantsModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    observation_date: {
        type: DataTypes.DATE,
        defaultValue: NOW
    },
    quantity: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        }
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'plant_id', 'observation_date']
        }
    ]
});

module.exports = ObservationsModel