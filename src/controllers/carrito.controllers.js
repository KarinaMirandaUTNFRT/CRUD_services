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
    if (itemIndex > -1) {
      carrito.items[itemIndex].cantidad += parseInt(cantidad);
    } else {
      carrito.items.push({
        servicio: servicioId,
        cantidad,
      });
    }
    await carrito.save();

    return res.status(201).json({
      mensaje: "Producto Servicio agregado al carrito con éxito",
      carrito,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "ocurrio un error al agregar un elemento al carrito" });
  }
};
export const obtenerCarrito = async (req, res) => {
  try {
    const userId = req.user.id;
    const carrito = await buscarOCrearCarrito(userId);
    await carrito.populate("items.servicio", "nombreServicio precio imagen");
    res.status(200).json(carrito);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "ocurrio un error al obtener el carrito" });
  }
};
export const vaciarCarrito = async (req, res) => {
  try {
    const userId = req.user.id;
    const carrito = await buscarOCrearCarrito(userId);
    carrito.items = [];
    await carrito.save();
    res
  .status(200)
  .json({ mensaje: "El carrito fue vaciado correctamente", carrito });
  
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "ocurrio un error al intentar vaciar el carrito" });
  }
};
export const restarCantidad = async(req, res)=>{
  try{
const userId = req.user.id
const {servicioId} = req.params

const carrito = await buscarOCrearCarrito(userId)
const itemIndex = carrito.items.findIndex((item)=> item.servicio.toString() === servicioId )
//verificamos si no encontramos el servicio en el array de items del carrito
if(itemIndex === -1){
  return res.status(404).json({mensaje: 'El servicio no se encuentra en el carrito'})
}
//restar la cantidad del servicio
carrito.items[itemIndex].cantidad -= 1

if(carrito.items[itemIndex].cantidad <= 0 ){
  //eliminar el servicio del array
  carrito.items.splice(itemIndex, 1)
}
//actualizar el carrito
await carrito.save()

res.status(200).json(carrito)

  }catch(error){
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar restar la cantidad de un servicio" });
  }
}