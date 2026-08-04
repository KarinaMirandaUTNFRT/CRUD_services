import mongoose from "mongoose";

import { Schema, model } from "mongoose";
const carritoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: true,
      unique: true,
    },
    items: [
      {
        ServicioId: {
          type: Schema.Types.ObjectId,
          ref: "servicio",
          required: true,
        },
        cantidad: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Carrito = mongoose.model("Carrito", carritoSchema);
export default Carrito;
