import { body } from "express-validator";
import resultadovalidacion from "./resultadoValidacion.js";

const validacionServicio = [
  body("nombreServicio").notEmpty().isString(),
  resultadovalidacion,
];
export default validacionServicio;
