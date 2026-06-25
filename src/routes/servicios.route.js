import { Router } from "express";
import { actualizarParcialServicio, borrarServicio, crearServicio, editarServicio, listarServicios, obtenerServicioId,  prueba } from "../controllers/servicios.controllers.js";
import validacionServicio from "../../middlewares/validacionServicio.js";

const router = Router();
//post crea
//put modifica
//delete borra

router.route("/test").get(prueba);
router.route ('/').post(validacionServicio, crearServicio).get(listarServicios)
router.route('/:id').get(obtenerServicioId).put(editarServicio).patch(actualizarParcialServicio).delete(borrarServicio); //id es un nombre inventado
export default router;
