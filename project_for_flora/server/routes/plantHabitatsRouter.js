const express = require('express')
const PlantHabitatController = require('../controllers/plantHabitatsController')

const plantHabitatsRouter = express.Router()

plantHabitatsRouter.get('/', PlantHabitatController.getAllPlantHabitats)
                   .post('/', PlantHabitatController.createPlantHabitats)
                   .delete('/', PlantHabitatController.deletePlantHabitats)
                   .put('/', PlantHabitatController.updatePlantHabitats)

module.exports = plantHabitatsRouter