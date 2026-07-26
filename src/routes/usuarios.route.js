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
  login,
  obtenerPerfil,
  logout
} from "../controllers/usuario.controllers.js";
import { autenticador } from "../middlewares/authmiddleware.js";

const usuariosRouter = Router();

usuariosRouter.route("/").get(listarUsuarios).post(crearUsuario);
usuariosRouter.route("/registro").post(registrarUsuario)
usuariosRouter.route("/verificar-cuenta").post(confirmarCodigoVerificacion)
usuariosRouter.route("/reenviar-codigo").post(solicitarNuevoCodigo)
usuariosRouter.route("/login").post(login)
usuariosRouter.route("/logout").post(logout)
usuariosRouter.route("/perfil").get(autenticador, obtenerPerfil)


usuariosRouter
  .route("/:id")
  .get(obtenerUsuarioId)
  .put(editarUsuario)
  .patch(editarParcialUsuario)
  .delete(borrarUsuario);

export default usuariosRouter;
