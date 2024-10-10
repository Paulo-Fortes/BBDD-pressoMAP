//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/publicacion.controller"); 

//metodo get

//para todas las publicaciones
router.get('/', controller.allComments);

//para una publicación
router.get('/:idUsuario', controller.showComments);

//metodo post
router.post('/', controller.storeComments);

//metodo put
router.put('/:idUsuario', controller.updateComments);

//metodo delete
router.delete('/:idUsuario', controller.destroyComments);

//exportar routers
module.exports = router;
