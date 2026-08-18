import Categoria from "../models/categoria.js";

export const crearCategoria = async (req, res) => {
  try {
    //todo: agregar el middleware para validar los datos del body
    const categoriaNueva = new Categoria(req.body);
    await categoriaNueva.save();
    
   
    res.status(201).json({ 
      mensaje: "se creo la categoria correctamente",
    categoria: categoriaNueva,
   });
  } catch (error) 
  {
    console.error("Error al crear categoría:", error);

    // Si ya existe una categoría con ese nombre (índice unique: true en MongoDB)
    if (error.code === 11000) {
      return res.status(400).json({
        mensaje: "Ya existe una categoría con ese nombre",
      });
    }

    // Si faltan campos requeridos o fallan las validaciones del Schema
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos para la categoría",
        detalles: error.message,
      });
    }

    // Error imprevisto en el servidor o caída de la base de datos
    return res.status(500).json({
      mensaje: "Se produjo un error al crear una categoría",
    });
};
};
export const listarCategorias = async(req, res)=>{
    try{
        const categorias = await Categoria.find();
        res.status(200).json(categorias)
    }catch(error){
        console.error(error);
        res
            .status(500)
            .json({ mensaje: "Se produjo un error al listar las categorias" });
    }
}