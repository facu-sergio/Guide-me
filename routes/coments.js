const express = require("express");
const router = express.Router();
const comentario_controller = require('../controllers/comentarios_controller');

router.post('/comentario',comentario_controller.guardarComentario)
router.post('/respuesta',comentario_controller.guardarRespuesta);

module.exports = router;