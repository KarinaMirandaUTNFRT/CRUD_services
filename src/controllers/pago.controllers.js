import { MercadoPagoConfig, Preference } from "mercadopago";
import Orden from "../models/orden.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const crearPreferencia = async (req, res) => {
  try {
    const { items, userId, montoTotal } = req.body;

    const itemsOrden = items.map((item) => ({
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

    const itemsMP = items.map((item) => ({
      id: item.servicio._id,
      title: item.servicio.nombreServicio,
      unit_price: Number(item.servicio.precio),
      quantity: Number(item.cantidad),
      currency_id: "ARS",
    }));

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: itemsMP,
        external_reference: nuevaOrden._id.toString(),
        back_urls: {
          success: `${process.env.PAYMENT_FRONTEND_URL}/checkout/resultado?status=success`,
          failure: `${process.env.PAYMENT_FRONTEND_URL}/checkout/resultado?status=failure`,
          pending: `${process.env.PAYMENT_FRONTEND_URL}/checkout/resultado?status=pending`,
        },
      },
    });

    nuevaOrden.preference = result.id;
    await nuevaOrden.save();

    return res.status(201).json({
      mensaje: "Preferencia de pago creada con exito",
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      ordenId: nuevaOrden._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error al crear la preferencia de pago",
    });
  }
};