import express from 'express'
import router from './router'
import db from './config/db'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUIOptions } from './config/swagger'
import { login } from './handlers/auth'

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

//Permitir conexiones CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // permitir peticiones directas desde herramientas (curl, Postman) que no envían Origin
    if (!origin) return callback(null, true);

    const allowed = [
      'http://localhost:5173', // Vite dev server
      'http://127.0.0.1:5173'
      // agrega otros orígenes si los necesitas (ej: dominios de staging)
    ];

    if (allowed.includes(origin)) {
      console.log('CORS permitido para:', origin);
      callback(null, true);
    } else {
      console.warn('CORS rechazado para:', origin);
      callback(new Error('CORS no permitido'));
    }
  },
  credentials: true, // si usas cookies de sesión
};
server.use(cors(corsOptions))

// Leer datos de forms
server.use(express.json())

server.use(morgan('dev'))

server.post('/api/login', login);

// Montas el router de productos en /api/products
server.use('/api/products', router);


//DOCS
server.use('/docs', swaggerUi.serve)
server.get('/docs', swaggerUi.setup(swaggerSpec, swaggerUIOptions))


export default server