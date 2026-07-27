import { Router } from "express";
import { crearCategoria } from "../controllers/categorias.controllers.js";
import { listarCategorias } from "../controllers/categorias.controllers.js";

const router = Router();

router.route("/").post(crearCategoria).get(listarCategorias);

export default router;