import { body, param } from "express-validator";
import resultadovalidacion from "./resultadoValidacion.js";
import Servicio from "../models/servicios.js";

const reglasServicio = [
  body("nombreServicio")
    .isString()
    .withMessage("El nombre del servicio debe ser un string")
    .custom(async (valor, { req }) => {
      const servicioBuscado = await Servicio.findOne({ nombreServicio: valor });
      console.log(servicioBuscado);

      if (!servicioBuscado) {
        return true;
      }
      if (req.params?.id && servicioBuscado._id.toString() === req.params.id) {
        return true;
      }
      throw new error(
        "El nombre del servicio ya existe en la base de datos, debes crear un nombre nuevo",
      );
    }),

  body("precio")
    .isNumeric()
    .withMessage("el precio debe ser un valor numerico")
    .isFloat({ min: 50 })
    .withMessage("el precio minimo es de $50 pesos"),
  //body("categoria")
    //.isString()
    //.withMessage("El nombre del servicio debe ser un string")
    //.isIn(["Desarrollo Web", "backend & API", "Consultoria"])
    //.withMessage(
      //"la categoria debe sewr alguno de los siguientes valores:'Desarrollo Web','backend & API', 'Consultoria' ",
    //),
  body("imagen")
    .isString()
    .withMessage("El nombre del la imagen debe ser un string")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/)
    .withMessage(
      "la imagen debe ser una URL valida con extension:jpg|jpeg|png|webp|avif|svg ",
    ),
  body("descripcion")
    .isString()
    .withMessage("La descripcion  de la imagen debe ser un string")
    .isLength({ min: 10, max: 500 })
    .withMessage("el numero del servicio debe tener entre 10 y 500 caracteres"),
];
export const validacionServicio = [
  ...reglasServicio.map((regla) =>
    regla.notEmpty().withMessage("Este campo es obligatorio"),
  ),
  resultadovalidacion,
];

export const validacionServicioPatch = [
  ...reglasServicio.map((regla) => regla.optional({ value: "falsy" })),
  resultadovalidacion,
];
export const validacionIDServicio = [
  param("id")
    .isMongoId()
    .withMessage("Este formato de ID no corresponde a un formato de Mongo"),
];
