const express = require("express")
const db = require("./db")
const cors = require('cors')
const bodyParser = require('body-parser')

const plantsRouter = require('./routes/plantsRouter')
const habitatsRouter = require('./routes/habitatsRouter')
const plantHabitatsRouter = require('./routes/plantHabitatsRouter')
const growingConditionsRouter = require('./routes/growingConditionsRouter')
const usersRouter = require('./routes/usersRouter')
const observationsRouter = require('./routes/observationsRouter')


const PORT = 5000

const server = express()

server.use(cors())
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

server.use('/plants', plantsRouter)
server.use('/habitats', habitatsRouter)
server.use('/planthabitats', plantHabitatsRouter)
server.use('/growingconditions', growingConditionsRouter)
server.use('/users', usersRouter)
server.use('/observations', observationsRouter)

db.authenticate().then(() => {
    console.log(`db START`);
})
    .catch(err => console.log(err))

server.listen(PORT, () => {
    console.log(`Server start on PORT ${PORT}`);
})