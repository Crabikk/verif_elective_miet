const { Sequelize } = require("sequelize")

const db = new Sequelize('flora_zelenograd', 'postgres', 'Art30122003', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});


module.exports = db