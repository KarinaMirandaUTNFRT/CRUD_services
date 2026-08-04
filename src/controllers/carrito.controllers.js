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
  
    const itemIndex = carrito.items.findIndex(
      (item) => item.servicio.toString() === servicioId,
    );
       
    //tengo este servicio en el carrito
if(itemIndex > -1){
     carrito.items[itemIndex].cantidad += parseInt(cantidad)
}else{
    
    carrito.items.push({
        servicio: servicioId,
        cantidad
    })
}
await carrito.save();

return res.status(201).json({
      mensaje: "Producto Servicio agregado al carrito con éxito",
      carrito
    });

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "ocurrio un error al agregar un elemento al carrito" });
  }
};
