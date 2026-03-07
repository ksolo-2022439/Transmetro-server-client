'use strict';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsOptions } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { dbConnection } from './db.js'; 

//Rutas
//EJEMPLO: import accountRoutes from '../src/accounts/account.routes.js';
import roadRoutes from '../src/roads/road.routes.js';
import stationRoutes from '../src/stations/station.routes.js';

const BASE_URL = '/TRANSMETRO-CONECTA/v1';

//Configuración de mi aplicación
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
}

//Integracion de todas las rutas
const routes = (app) => {
    //EJEMPLO: app.use(`${BASE_URL}/accounts`, accountRoutes);
    app.use(`${BASE_URL}/roads`, roadRoutes);
    app.use(`${BASE_URL}/stations`, stationRoutes);
}

//FUNCIÓN PARA INICIAR EL SERVIDOR
const initServer = async () => {
    //Creación de la instancia de la aplicaccion
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        //Conexión a Base de Datos (Esperamos a que conecte)
        await dbConnection();

        //CONFIGURACIONES DEL MIDDLEWARES Y RUTAS
        middlewares(app);
        routes(app);
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

        //Primera ruta (Health Check)
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'TRANSMETRO-CONECTA Admin',
                version: '1.0.0'
            });
        });

    } catch (error) {
        console.log('Error al iniciar el servidor:', error);
    }
}

export { initServer };