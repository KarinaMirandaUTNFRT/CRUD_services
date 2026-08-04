import Carrito from "../models/carrito.js";

const buscarOCrearCarrito = async (userId) => {
  let miCarrito = await Carrito.findOne({ usuario: userId });
  if (!miCarrito) {
    miCarrito = await Carrito.create({ usuario: userId, items: [] });
  }
  return miCarrito;
};
export default buscarOCrearCarrito;
