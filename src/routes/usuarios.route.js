import { Router } from "express";
import {
  listarUsuarios,
  obtenerUsuarioId,
  crearUsuario,
  editarUsuario,
  editarParcialUsuario,
  borrarUsuario,
  registrarUsuario,
  confirmarCodigoVerificacion,
  solicitarNuevoCodigo,
  login
} from "../controllers/usuario.controllers.js";

const usuariosRouter = Router();

usuariosRouter.route("/").get(listarUsuarios).post(crearUsuario);
usuariosRouter.route("/registro").post(registrarUsuario)
usuariosRouter.route("/verificar-cuenta").post(confirmarCodigoVerificacion)
usuariosRouter.route("/reenviar-codigo").post(solicitarNuevoCodigo)
usuariosRouter.route("/loguin").post(login)

usuariosRouter
  .route("/:id")
  .get(obtenerUsuarioId)
  .put(editarUsuario)
  .patch(editarParcialUsuario)
  .delete(borrarUsuario);

export default usuariosRouter;
