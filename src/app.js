const express = require('express');
const db = require('./utils/database')
const initModels = require('./models/initModels')
const config = require('./config')

const productsRouter = require('./products/products.router')

const app = express()


//? Accion Informativa de si las credenciales son correctas
db.authenticate()    
    .then(() => console.log('DB Authentication Succesfully') )
    .catch((err) => console.log(err))


 //? Sincroniza los modelos con la base de datos, creando las tablas
db.sync()   
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err))

initModels()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'OK!'})
})

app.use('/products', productsRouter)



app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})
