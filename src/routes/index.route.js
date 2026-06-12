import { Router } from "express";
import serviciosrouter from "./servicios.route.js";
const router = Router ()
router.use('/servicios', serviciosrouter)
export default router