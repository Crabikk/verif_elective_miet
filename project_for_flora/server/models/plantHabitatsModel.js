const {DataTypes, NOW} = require('sequelize')
const db = require('../db')
const PlantsModel = require('./plantsModel')
const HabitatsModel = require('./habitatsModel')

// Модель для таблицы "Plant_Habitats"
const PlantHabitatsModel = db.define('plant_habitats', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Генерация UUID по умолчанию
    },
    plant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: PlantsModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    habitat_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: HabitatsModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true // Поле может быть пустым
    },
    date_recorded: {
        type: DataTypes.DATEONLY, // Для хранения только даты
        allowNull: true // Поле может быть пустым
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Значение по умолчанию
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Значение по умолчанию для текущей даты и времени
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Значение по умолчанию для текущей даты и времени
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['plant_id', 'habitat_id']
        }
    ],
    timestamps: false 
});

module.exports = PlantHabitatsModel