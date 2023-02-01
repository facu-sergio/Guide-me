const express = require("express");
const router = express.Router();
const comentario_controller = require('../controllers/comentarios_controller');

router.post('/savecomentario',comentario_controller.guardarComentario)
router.get('/getComentarios',comentario_controller.getComentarios);
router.post('/updatecomentario',comentario_controller.updateComentarios);
router.post('/deletecomentario',comentario_controller.deleteComentarios)
module.exports = router;