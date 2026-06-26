import mongoose, { Schema } from "mongoose";
const servicioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No permite correos duplicados en la base de datos
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "cliente"],
      },
    },
  },

  {
    timestamp: true, //tengo la fecha y hora de creacion y actualizacion
  },
);
const Usuario = mongoose.model("usuario", usuarioSchema); //vinculo elusuarioSchema con la DB
export default Usuario;