import Servicio from '../models/servicios.js'
export const agregarAlCarrito = async(req, res)=>{
    try {
   const {servicioId, cantidad} = req.body;
   const userId = req.user.id
   const servicioBuscado = await Servicio.findById(servicioId)
   if(!servicioBuscado){
    return res
    .status(404)
    .json ({mensaje: 'El servicio solicitado no esiste'}); 
   }  
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: 'ocurrio un error al agregar un elemento al carrito'})
    }
}