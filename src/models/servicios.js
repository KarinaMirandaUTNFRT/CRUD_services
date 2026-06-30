import mongoose, {Schema} from "mongoose";
const servicioSchema = new Schema(
{
    //propiedadd del objeto servicio
    nombreServicio:{
type: String, 
required: true,
unique: true,
minlength:5,
maxlength:100,
trim: true,
    },
    precio:{
        type: Number,
        required: true,
        min: 50, 
    },
    imagen:{
        type: String,
        required: true,
        validate: (valor) =>  /^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/.test(valor)
        
    },
    categoria:{
        type: String, 
        required: true,
        enum:['Desarrollo Web','backend & API', 'Consultoria']
    },
    descripcion: {
        type: String,
        minlength: 10,
        maxlength:500,
        required: true,
    },
},
{
    timestamp: true, //tengo la fecha y hora de creacion y actualizacion
}

);
const Servicio = mongoose.model('servicio', servicioSchema)
export default Servicio