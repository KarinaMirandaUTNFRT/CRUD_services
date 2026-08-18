import mongoose from "mongoose";

import { Schema, model } from "mongoose";
const ordenSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: true,
      
    },
    items: [
      {
        servicio: {
          type: Schema.Types.ObjectId,
          ref: "servicio",
          required: true,
        },
        nombreServicio:
        {
            Type: String,
            requied:true
        },
        precioUnitario:{
            Type:Number,
            requied: true,
        },
        cantidad: {
          type: Number,
          requied: true,
          min: 1,
        },
      },
    ],
    montoTotal:{
        Type:Number,
        requied: true,
    },
    estado:{
        type: String,
        enum: ['pendiente', 'aprobado', 'rechazado','cancelado'],
      default:'pendiente'
    },
    preference: {
        type: String
    },
    paymentId:{
        type:String
    }
  },
  {
    timestamps: true,
  },
);
const Orden = mongoose.model("orden", carritoSchema);
export default Orden;
