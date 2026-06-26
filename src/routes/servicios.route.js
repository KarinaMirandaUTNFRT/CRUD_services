import { Router } from "express";
import { actualizarParcialServicio, borrarServicio, crearServicio, editarServicio, listarServicios, obtenerServicioId,  prueba } from "../controllers/servicios.controllers.js";
import {validacionIDServicio, validacionServicio} from "../../middlewares/validacionServicio.js";

const router = Router();
//post crea
//put modifica
//delete borra

router.route("/test").get(prueba);
router.route ('/').post(validacionServicio, crearServicio).get(listarServicios)
router.route('/:id').get(validacionIDServicio, obtenerServicioId).put([validacionIDServicio, validacionServicio], editarServicio).patch(actualizarParcialServicio).delete(validacionIDServicio,borrarServicio); //id es un nombre inventado
export default router;
