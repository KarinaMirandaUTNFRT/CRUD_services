import mongoose from "mongoose";

const conectarDb = async () => {
  // Ponemos la URL directamente como un string para saltarnos el problema del .env
  const URI = "mongodb://KarinaMiranda_db_user:dMrrNuEqnAtUZBqi@ac-kfegklu-shard-00-00.gjmwsad.mongodb.net:27017,ac-kfegklu-shard-00-01.gjmwsad.mongodb.net:27017,ac-kfegklu-shard-00-02.gjmwsad.mongodb.net:27017/db_servicios?ssl=true&replicaSet=atlas-glbtdp-shard-0&authSource=admin&appName=Cluster0";

  try {
    await mongoose.connect(URI);
    console.info("¡Conexión a la base de datos exitosa mediante URI directa!");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

export default conectarDb; 