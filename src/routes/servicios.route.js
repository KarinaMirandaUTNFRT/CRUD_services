import { Router } from "express";
import {
  actualizarParcialServicio,
  borrarServicio,
  crearServicio,
  editarServicio,
  listarServicios,
  obtenerServicioId,
  
} from "../controllers/servicios.controllers.js";
import {
  validacionIDServicio,
  validacionServicio,
  validacionServicioPatch,
} from "../middlewares/validacionServicio.js";
import { autenticador } from "../middlewares/authmiddleware.js";
import { esAdmin } from "../controllers/usuario.controllers.js";

const router = Router();
//post crea
//put modifica
//delete borra


router.route("/").post([autenticador,esAdmin,validacionServicio], crearServicio).get([autenticador,esAdmin], listarServicios);
router
  .route("/:id")
  .get(validacionIDServicio, obtenerServicioId)
  .delete([autenticador,esAdmin,validacionIDServicio], borrarServicio)
  .put([autenticador,esAdmin,validacionIDServicio, validacionServicio], editarServicio)
  .patch([autenticador,esAdmin,validacionServicioPatch], editarServicio);
export default router;
