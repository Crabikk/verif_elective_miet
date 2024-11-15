const express = require('express')
const UsersController = require('../controllers/usersConroller')

const usersRouter = express.Router()

usersRouter.get('/', UsersController.getAllUsers)
            .post('/', UsersController.createUser)
            .delete('/', UsersController.deleteUser)
            .put('/', UsersController.updateUser)

module.exports = usersRouter