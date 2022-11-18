const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth_middleware');
const {rolMiddleware} = require('../middlewares/auth_middleware');
const {idMiddleware} = require('../middlewares/publicacion_middleware');
const publicacion_controller =  require('../controllers/publicacion_controller');

router.get('/crearpublicacion',authMiddleware,rolMiddleware,publicacion_controller.getFormulario);

router.post('/crearpublicacion',authMiddleware,rolMiddleware, publicacion_controller.savePublicacion);

router.get('/editarpublicacion',authMiddleware,idMiddleware,publicacion_controller.getFormularioEditar);

router.post('/editarpublicacion',authMiddleware,idMiddleware,publicacion_controller.editarPublicacion);

router.get('/publicacion',publicacion_controller.getPublicacion);

router.post('/search',publicacion_controller.search);

router.get('/publicaciones',publicacion_controller.getPublicacionByCarrera);

router.get('/borrarpublicacion',authMiddleware,idMiddleware, publicacion_controller.deletePublicacion);

module.exports = router;