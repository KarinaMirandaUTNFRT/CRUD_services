import { MercadoPagoConfig, Preference } from "mercadopago";
import buscarOCrearCarrito from "../utils/buscarOCrearCarrito.js";
import Orden from "../models/orden.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
export const crearPreferenciaPago = async (req, res) => {
  try {
    const userId = req.user.id;

    const carrito = await buscarOCrearCarrito(userId);
    await carrito.populate("items.servicio");

    if (carrito.items.length === 0) {
      res.status(500).json({ mensaje: "El carrito esta vacio" });
    }
    let montoTotal = 0;
    const itemsMP = carrito.items.map((item) => {
      const subtotal = item.servicio.precio * item.cantidad;
      montoTotal += subtotal;
      return {
        id: item.servicio._id.toString(),
        title: item.servicio.nombreServicio,
        unit_price: Number(item.servicio.precio),
        quantity: Number(item.cantidad),
        currency_id: "ARS",
        picture_url: item.servicio.imagen,
      };
    });
    const itemsOrden = carrito.items.map((item) => ({
      servicio: item.servicio._id,
      nombreServicio: item.servicio.nombreServicio,
      precioUnitario: item.servicio.precio,
      cantidad: item.cantidad,
    }));

    const nuevaOrden = new Orden({
      usuario: userId,
      items: itemsOrden,
      montoTotal,
      estado: "pendiente",
    });
    await nuevaOrden.save();

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: itemsMP,
        external_reference: nuevaOrden._id.toString(),
        //todo: aqui trabajar con el webhook
        back_urls: {
          success: `${process.env.PAYMENT_FRONTEND_URL}/checkout/resultado?status=success`,
          failure: `${process.env.PAYMENT_FRONTEND_URL}/checkout/resultado?status=failure`,
          pending: `${process.env.PAYMENT_FRONTEND_URL}/checkout/resultado?status=pending`,
        },
        auto_return: "approved",
      },
    });
    nuevaOrden.preference = result.id;
    await nuevaOrden.save();

    return res.status(201).json({
      mensaje: "Preferencia de pago creada con exito",
      init_point: result.init_point, // redireccion MP
      sandbox_init_point: result.sandbox_init_point,
      ordenId: nuevaOrden._id,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Ocurrio un error al crear la preferencia de pago" });
  }
};
