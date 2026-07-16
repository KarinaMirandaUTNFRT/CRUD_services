import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema(
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
      validate: {
        validator: (valor) => {
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(valor);
            
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
      validator: (valor) => {
         /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,50}$/.test(valor);
      }
    },
},
    rol: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "cliente"],
        default:"cliente",
      },
    },
  },

  {
    timestamp: true, //tengo la fecha y hora de creacion y actualizacion
  },
);
const Usuario = mongoose.model("usuario", usuarioSchema); //vinculo elusuarioSchema con la DB
export default Usuario;



    
