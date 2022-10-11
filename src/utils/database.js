const { Sequelize } = require('sequelize')
const config = require('../config')

const db = new Sequelize({
    dialect: 'postgres', //?que dialecto se usara en este caso postgres 'postgres'
    host: config.db.host, //? localhost 127.0.0.2 'localhost'
    username: config.db.username, //? nombre de usuario postgres 'postgres'
    password: config.db.password, //? Variable de entorno de la contraseña root  'root'
    database: config.db.name //? base de datos a la que nos conectaremos, port: 5432  'movies_crud'
})


module.exports = db
