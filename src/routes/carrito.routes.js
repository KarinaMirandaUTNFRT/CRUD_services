import {Router} from 'express'
import { agregarAlCarrito } from '../controllers/carrito.controllers';

const router = router();

router.route('/'). post (autenticador, agregarAlCarrito)

export default router