import express from 'express'
import router from './router'
import db from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUIOptions } from './config/swagger'

// Conexion a BD
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log('Conexion a la BD exitosa')
    } catch (error) {
        console.log(error)
        console.log('Hubo un error al conectar a la BD')
    }
}

connectDB()

// Instancia de express
const server = express()

// Leer datos de forms
server.use(express.json())

server.use('/api/products', router)

//DOCS
server.use('/docs', swaggerUi.serve)
server.get('/docs', swaggerUi.setup(swaggerSpec, swaggerUIOptions))


export default server