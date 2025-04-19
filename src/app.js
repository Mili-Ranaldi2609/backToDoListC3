import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Importar routers
import { TaskRouter } from "./routes/tasks.js";
import { SprintRouter } from "./routes/sprints.js";
import { BacklogRouter } from "./routes/backlog.js";

dotenv.config(); // Carga variables del archivo .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite leer JSON en body

// Rutas base
app.use("/tasks", TaskRouter);
app.use("/sprints", SprintRouter);
app.use("/backlog", BacklogRouter);

// Conexión a MongoDB
const PORT = process.env.PORT || 3000; // Se utiliza la variable de entorno o el puerto 3000 por defecto

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("Error al conectar a MongoDB:", err.message);
});
