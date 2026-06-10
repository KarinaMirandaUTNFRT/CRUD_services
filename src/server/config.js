import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import '../database.db.jsp'

export default class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        
      
        this.middleware();
    }

 
    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        
        const __dirname = dirname(fileURLToPath(import.meta.url));
        console.log(__dirname + '/public');

        this.app.use(express.static(__dirname + '../../public'));
    }

    Listen() {
        
        this.app.listen(this.PORT, () => {
            console.info(`Servidor activo en el puerto: http://localhost:${this.PORT}`);
        });
    }
}