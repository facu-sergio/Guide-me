const express = require("express");
const router = express.Router();
const comentario_controller = require('../controllers/comentarios_controller');

router.post('/savecomentario',comentario_controller.guardarComentario)
router.get('/getComentarios',comentario_controller.getComentarios);
router.get('/getpersonascomentando',comentario_controller.getPersonasComentando);
module.exports = router;