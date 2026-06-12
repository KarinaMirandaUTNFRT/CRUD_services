import { Router } from "express";
import serviciosRouter from "./servicios.route.js";
const router = Router ()
router.use('/servicios', serviciosRouter)
export default router