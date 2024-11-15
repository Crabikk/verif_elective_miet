const express = require('express')
const PlantsController = require('../controllers/plantsController')

const plantsRouter = express.Router()

plantsRouter.get('/', PlantsController.getAllPlants)
            //посмотреть в express как сделать получение данных по id
            //noteRouter.get('/plants', NoteController.getAllNote)
            .get('/:id', PlantsController.getPlantById )
            .post('/', PlantsController.createPlant)
            .delete('/', PlantsController.deletePlant)
            .put('/', PlantsController.updatePlant)

module.exports = plantsRouter