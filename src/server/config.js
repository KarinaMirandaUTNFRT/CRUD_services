import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default class Server{
            constructor(){
                this.app = express();
                this.PORT = process.env.PORT ||  3000
            }

Listen(){
    app.listen(PORT, () => {
    console.info(`servidor activo en el puerto http://localhosst:${this.PORT}`);
});
}
}