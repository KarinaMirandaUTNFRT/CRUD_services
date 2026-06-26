import Usuario from "../models/Usuario.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al listar los usuarios" });
  }
};
export const obtenerUsuarioId = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (!usuarioBuscado) {
      return res.status(404).json({ mensaje: "No se encontró el usuario buscado" });
    }
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al buscar el usuario por ID" });
  }
};


export const crearUsuario = async (req, res) => {
  try {
    // Verificamos si el email ya existe antes de intentar guardarlo para evitar el error de Mongoose
    const emailExistente = await Usuario.findOne({ email: req.body.email });
    if (emailExistente) {
      return res.status(400).json({ mensaje: "Este correo electrónico ya está registrado" });
    }

    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json({
      mensaje: "El usuario fue creado con éxito",
      nuevoUsuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear el usuario" });
  }
};


export const editarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "No se encontró el usuario para editar" });
    }
    res.status(200).json({
      mensaje: "El usuario fue modificado con éxito",
      usuarioActualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar editar el usuario" });
  }
};


export const borrarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: "No se encontró el usuario que querés borrar" });
    }
    res.status(200).json({
      mensaje: "El usuario fue eliminado con éxito",
      usuarioEliminado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar borrar el usuario" });
  }
};
export const editarParcialUsuario = async (req, res) => {
  try {
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // El operador $set de Mongoose asegura que solo se cambie lo enviado
      { new: true, runValidators: true } // runValidators hace que respete el enum y reglas del Schema
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "No se encontró el usuario que querés editar" });
    }

    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuarioActualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al intentar actualizar el usuario" });
  }
};