import express from 'express'
import cors from 'cors';
import userRoute from '../routes/userRoute.js';
import AuthRoute from '../routes/AuthRoute.js';
import { dbConnection } from '../database/config.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users'
        this.authPath = '/api/auth'

        // connect database
        this.connectBd();

        //middlewares
        this.middlewares();

        // rutas de mi aplicacion
        this.router();
    }

    async connectBd() {
        await dbConnection();
    }

    middlewares() {
        // ocrs
        this.app.use(cors());

        // Parse
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public') );
    }
    
    router() {
        this.app.use(this.authPath, AuthRoute);
        this.app.use(this.userPath, userRoute);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listen Port:', this.port);
        })
    }
  
}