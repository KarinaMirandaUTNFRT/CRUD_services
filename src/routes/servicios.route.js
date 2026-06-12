import { Router } from "express";
//import { prueba } from "../controllers/servicios.controllers.js";

const router = Router();

router.route("/test").get(prueba);

export default router;
