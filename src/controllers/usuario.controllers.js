import Usuario from "../models/Usuario.js";
import transporter from "../utils/mailer.js"

export const listarUsuarios = async (req, res) => {
  try {
    const usuarioNuevo = await Usuario.find();
    res.status(201).json({mensaje: 'aqui creo un usuario'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear  usuarios" });
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

    const nuevoUsuario = new nuevoUsuario(req.body);
    await Usuario.save();
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
export const registrarUsuario = async (req, res) => {
  //1- recibir el req
  try{
const {nombreUsuario, email, password, rol} = req.body
const usuarioExistente = await Usuario.findOne({email})
if(usuarioExistente)
{
  return res.status(409).json({mensaje:'El email enviado ya esta registrado'})
}
//2- generar un codigo de verificacion
    const codigoVerificacion = Math.floor(100000 + Math.random() * 900000).toString();
    const fechaExpiracionCodigo = new Date(Date.now() + 15 * 60 * 1000);
//3- crear el usuario y enviar por email el codigo
const datosUsuario = {
  nombreUsuario,
  email,
  password,
  codigoVerificacion,
  fechaExpiracionCodigo, 
}
if (typeof rol === 'string' && rol.trim() !== '') {
    datosUsuario.rol = rol.toLowerCase();
}

//4- guardar el dato en el usuario
const usuarioNuevo = await Usuario.create(datosUsuario)
//5- enviar el mail
await transporter.sendMail({
      from: '"Crud Servicios" <no-reply@crud-servicios.com>',
      to: datosUsuario.email,
      subject: "🔑 Código de Verificación de Cuenta",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">¡Hola, ${datosUsuario.nombreUsuario}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Gracias por registrarte. Para activar tu cuenta y poder ingresar a la plataforma, por favor utiliza el siguiente código de verificación:
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 4px; color: #007bff;">
            ${codigoVerificacion}
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este código vencerá en 15 minutos. Si no solicitaste este registro, puedes ignorar este correo de forma segura.
          </p>
        </div>
      `
    });
//6- enviar respuesta
res.status(201).json({mensaje: 'El usuario fue creado correctamente'})
} catch (error) {
console.error(error);
res.status(500).json({ mensaje: "Ocurrio un error al registrar usuarios" });
}
};