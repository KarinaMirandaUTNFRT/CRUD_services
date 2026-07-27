import { Router } from "express";
import serviciosRouter from "./servicios.route.js";
import usuariosRouter from "./usuarios.route.js";
import categoriaRouter from "./categoria.route.js";

const router = Router();
router.use("/servicios", serviciosRouter);
router.use("/usuarios", usuariosRouter);
router.use("/categorias", categoriaRouter);

export default router;
