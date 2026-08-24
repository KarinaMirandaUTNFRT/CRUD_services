import { Router } from "express";
import { crearPreferenciaPago } from "../controllers/pago.controllers.js";
import { autenticador } from "../middlewares/authmiddleware.js";
import { recibirWebhook} from "../controllers/pago.controllers.js"


const router = Router();

router.route("/crear-preferencia") . post(autenticador, crearPreferenciaPago)
router.route("/webhook").post(recibirWebhook);

export default router;
