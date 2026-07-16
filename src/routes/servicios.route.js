import { Router } from "express";
import {
  //actualizarParcialServicio,
  borrarServicio,
  crearServicio,
  editarServicio,
  listarServicios,
  obtenerServicioId,
  prueba,
} from "../controllers/servicios.controllers.js";
import {
  validacionIDServicio,
  validacionServicio,
  validacionServicioPatch,
} from "../middlewares/validacionServicio.js";

const router = Router();
//post crea
//put modifica
//delete borra

//router.route("/test").get(prueba);
router.route("/").post(validacionServicio, crearServicio).get(listarServicios);
router
  .route("/:id")
  .get(validacionIDServicio, obtenerServicioId)
  .delete(validacionIDServicio, borrarServicio)
  .put([validacionIDServicio, validacionServicio], editarServicioPorID)
  .patch(validacionServicioPatch, editarServicioPorID);
export default router;
