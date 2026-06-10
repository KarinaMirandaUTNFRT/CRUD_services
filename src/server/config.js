import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

class Server{
            constructor(){
                this.app = express();
                this.PORT = 3000
            }

}