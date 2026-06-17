import { Router } from "express";
import { crearServicio, listarServicios, prueba } from "../controllers/servicios.controllers.js";

const router = Router();
//post crea
//put modifica
//delete borra

router.route("/test").get(prueba);
router.route ('/').post(crearServicio).get(listarServicios)

export default router;
