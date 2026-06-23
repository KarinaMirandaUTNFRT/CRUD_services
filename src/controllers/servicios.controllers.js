import Servicio from "../models/Servicios.js";
export const prueba = (req, res) => {
  res.json("hasta luego ultima prueba");
};
export const obtenerServicioId = async (req, res) => {
  try {
    console.log(req.params.id);
    const servicioBuscado = await Servicio.findById(req.params.id);
        if (!servicioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "no se encontro el servicio por id" });
    }
    res.status(200).json(servicioBuscado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "ocurrio un error al buscar un servicio por id" });
  }
};
export const listarServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.status(200).json(servicios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "ocurrio un error al listar los servicios" });
  }
};
export const crearServicio = async (req, res) => {
  try {
    const nuevoServicio = new Servicio(req.body);
    await nuevoServicio.save();
    res
      .status(201)
      .json({ mensaje: "El servicio fue creado con éxito", nuevoServicio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear el servicio" });
  }
};
