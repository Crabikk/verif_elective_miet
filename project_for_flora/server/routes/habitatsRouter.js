const express = require('express')
const HabitatsController = require('../controllers/habitatsController')

const habitatsRouter = express.Router()

habitatsRouter.get('/', HabitatsController.getAllHabitats)
              .post('/', HabitatsController.createHabitat)
              .delete('/', HabitatsController.deleteHabitat)
              .put('/', HabitatsController.updateHabitat)

module.exports = habitatsRouter