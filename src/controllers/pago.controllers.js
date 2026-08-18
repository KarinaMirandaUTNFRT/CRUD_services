import{MercadoPagoConfig, Preference} from "mercadopago"
import buscarOCrearCarrito from "../utils/buscarOCrearCarrito.js";

const client = new MercadoPagoConfig({ accessToken: procces.env.MP_ACCESS_TOKEN });
try {
const userId = req.user.id
const carrito = await buscarOCrearCarrito(userId)
    
} catch (error) {
    console.error(error)
    res.status(500).json({mensaje: 'Ocurrio un error al crear la preferencia de pago'})
}
export const crearPreferenciaPago = async(requestAnimationFrame, res) => {

}