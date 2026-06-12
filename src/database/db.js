import mongoose from "mongoose";

const conectarDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("¡Conexión a la base de datos exitosa!");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

// Exportamos por defecto para que Server controle cuándo llamarla
export default conectarDb;