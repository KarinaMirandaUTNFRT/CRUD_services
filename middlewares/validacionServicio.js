import { body, param } from "express-validator";
import resultadovalidacion from "./resultadoValidacion.js";

export const validacionServicio = [
  body("nombreServicio")
    .notEmpty()
    .withMessage("el nombre del servicio es un dato obligatorio")
    .isString()
    .withMessage("El nombre del servicio debe ser un string")
    .isLength({ min: 5, max: 100 })
    .withMessage("el numero del servicio debe tener entre 5 y 100 caracteres")
    ,
  body('precio')
    .notEmpty()
    .withMessage("el precio es sun dato obligatorio")
    .isNumeric()
    .withMessage("el precio debe ser un valor numerico")
    .isFloat({ min: 50 })
    .withMessage("el precio minimo es de $50 pesos")
    ,
  body('categoria')
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isString()
    .withMessage("El nombre del servicio debe ser un string")
.isIn(['Desarrollo Web','backend & API', 'Consultoria'])
.withMessage("la categoria debe sewr alguno de los siguientes valores:'Desarrollo Web','backend & API', 'Consultoria' ")
    ,
     body('imagen')
     .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .isString()
    .withMessage("El nombre del la imagen debe ser un string")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/)
     .withMessage("la imagen debe ser una URL valida con extension:jpg|jpeg|png|webp|avif|svg ")
     ,
      body('descripcion')
     .notEmpty()
    .withMessage("La descripcion es un dato obligatorio")
    .isString()
    .withMessage("La descripcion  de la imagen debe ser un string")
     .isLength({ min: 10, max: 500 })
    .withMessage("el numero del servicio debe tener entre 10 y 500 caracteres")
    ,
  resultadovalidacion,
];

export const validacionIDServicio=[
param('id').isMongoId().withMessage('Este formato de ID no corresponde a un formato de Mongo')
,
resultadovalidacion
]
