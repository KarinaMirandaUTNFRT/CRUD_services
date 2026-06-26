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
export const editarServicio = async (req, res) => {
  try {
    // 1. Buscamos por el ID que viene en la URL y le pasamos los datos nuevos del req.body
    // { new: true } sirve para que MongoDB nos devuelva el documento YA modificado
    const servicioActualizado = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // 2. Si el ID no existía en la base de datos, avisamos
    if (!servicioActualizado) {
      return res.status(404).json({ mensaje: "No se encontró el servicio para editar" });
    }

    // 3. Si todo salió bien, respondemos con éxito y el objeto editado
    res.status(200).json({
      mensaje: "El servicio fue editado con éxito",
      servicioActualizado
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar editar el servicio" });
  }
};
export const actualizarParcialServicio = async (req, res) => {
  try {
    // Mongoose es inteligente: si en req.body solo viene el precio, solo actualiza el precio
    const servicioActualizado = await Servicio.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Para que devuelva el objeto ya cambiado
    );

    if (!servicioActualizado) {
      return res.status(404).json({ mensaje: "No se encontró el servicio" });
    }

    res.status(200).json({
      mensaje: "Servicio actualizado parcialmente con éxito",
      servicioActualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al aplicar el PATCH" });
  }
};
export const borrarServicio = async (req, res) => {
  try {
    // Buscamos por el ID de la URL y lo eliminamos en el acto
    const servicioEliminado = await Servicio.findByIdAndDelete(req.params.id);

    // Si el ID no existía en la base de datos, avisamos
    if (!servicioEliminado) {
      return res.status(404).json({ mensaje: "No se encontró el servicio que querés borrar" });
    }

    // Si todo salió bien, respondemos con éxito
    res.status(200).json({
      mensaje: "El servicio fue eliminado con éxito",
      servicioEliminado // Opcional: devolvemos el objeto que se borró
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar borrar el servicio" });
  }
};