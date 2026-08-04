import Servicio from "../models/servicios.js";
import buscarOCrearCarrito from "../utils/buscarOCrearCarrito.js";
export const agregarAlCarrito = async (req, res) => {
  try {
    const { servicioId, cantidad } = req.body;
    const userId = req.user.id;
    const servicioBuscado = await Servicio.findById(servicioId);
    if (!servicioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "El servicio solicitado no existe" });
    }
    const carrito = await buscarOCrearCarrito(userId);
    console.log('carrito antes', carrito.items)
    const itemIndex = carrito.items.findIndex(
      (item) => item.servicio.toString() === servicioId,
    );
    console.log(itemIndex);
    //tengo este servicio en el carrito
if(itemIndex > -1){
    console.log('actualizar cantidad')
}else{
    
    carrito.items.push({
        servicio: servicioId,
        cantidad
    })
}
console.log(carrito.items)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "ocurrio un error al agregar un elemento al carrito" });
  }
};
