import { Router } from "express";
import {
  listarUsuarios,
  obtenerUsuarioId,
  crearUsuario,
  editarUsuario,
  borrarUsuario
} from "../controllers/usuario.controllers.js";

const usuariosRouter = Router();

usuariosRouter.route("/").get(listarUsuarios).post(crearUsuario);

usuariosRouter
  .route("/:id")
  .get(obtenerUsuarioId)
  .put(editarUsuario)
  .delete(borrarUsuario);

export default usuariosRouter;
