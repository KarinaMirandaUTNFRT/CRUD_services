import Servicio from "../models/Servicios.js";

export const prueba = (req, res) => {
    res.json("hasta luego ultima prueba");

}
export const crearServicio = async(req, res) => {
    try{

       const servicioNuevo = new Servicio(req.body)
       await servicioNuevo.save()
       res.status(201).json({mensaje:'el servicio fue creado '})
       //aqui se guarda en la BD, viaja a MongoAtlas y vuelve
    
    }catch(error){
        console.error(error)
        res.status(500).json({mensaje:'ocurrio un error'})
    }

}
export const listarServicios = async(req, res) => {
    try{

       const servicios = await Servicio.find()
       res.status(200).json(servicios)
    
    }catch(error){
        console.error(error)
        res.status(500).json({mensaje:'ocurrio un error al listar los servicios'})
    }

}