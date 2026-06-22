import { Router } from "express";
import { crearServicio, listarServicios,obtenerServicioId,  prueba } from "../controllers/servicios.controllers.js";

const router = Router();
//post crea
//put modifica
//delete borra

router.route("/test").get(prueba);
router.route ('/').post(crearServicio).get(listarServicios)
router.route('/:id').get(obtenerServicioId) //id es un nom bre inventado
export default router;
