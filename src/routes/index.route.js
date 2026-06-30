import { Router } from "express";
import serviciosRouter from "./servicios.route.js";
import usuariosRouter from "./usuarios.route.js";

const router = Router();
router.use("/servicios", serviciosRouter);
router.use("/usuarios", usuariosRouter);
export default router;
