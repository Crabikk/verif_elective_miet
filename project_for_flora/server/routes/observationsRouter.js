const express = require('express')
const ObservationController = require('../controllers/observationsController')

const observationsRouter = express.Router()

observationsRouter.get('/', ObservationController.getAllObservations)
                  .post('/', ObservationController.createObservation)
                  .delete('/', ObservationController.deleteObservation)
                  .put('/', ObservationController.updateObservation)

module.exports = observationsRouter