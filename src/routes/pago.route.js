import { Router } from "express";
import { crearPreferencia } from "../controllers/pago.controllers.js";
import { autenticador } from "../middlewares/authmiddleware.js";


const router = Router();

router.route("/crear-preferencia"). post(autenticador, crearPreferencia)
  


export default router;
