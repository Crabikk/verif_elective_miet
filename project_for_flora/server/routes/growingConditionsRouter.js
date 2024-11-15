const express = require('express')
const GrowingConditionsController = require('../controllers/growingConditionsController')

const growingConditionsRouter = express.Router()

growingConditionsRouter.get('/', GrowingConditionsController.getAllGrowingConditions)
                       .post('/', GrowingConditionsController.createGrowingCondition)
                       .delete('/', GrowingConditionsController.deletePlant)
                       .put('/', GrowingConditionsController.updatePlant)

module.exports = growingConditionsRouter