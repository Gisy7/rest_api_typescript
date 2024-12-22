import express from "express";
import router from "./router";
import db from "./config/db"
import colors from "colors"
import cors from "cors"
import { CorsOptions } from "cors";
import swaggerUI from "swagger-ui-express";
import { options } from "./config/swagger"
import swaggerJSDoc from 'swagger-jsdoc';
import morgan from "morgan";

// Conectar a la base de datos
async function connectDb() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bgGreen.white.bold("conexion existosa"));
    } catch (error) {
        // console.log(error);
        // console.log(colors.bgRed.white("se ha producido un error a la hora de conectar a la base de datos"));
    }
}

connectDb()


// instancia de express
const server = express()

// Habilitar cors
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(null, false)
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

// Ver logs 
server.use(morgan("dev"))

// Rutas de la api
server.use("/api", router)

// DOCS de la API
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)))


export default server