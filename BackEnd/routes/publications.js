const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth_middleware');
const publicacion_controller =  require('../controllers/publicacion_controller');

router.get('/crearpublicacion',authMiddleware,(req,res)=>{
    res.render('form-publicacion')
})

router.post('/crearpublicacion',authMiddleware,publicacion_controller.savePublicacion);

router.get('/publicacion',(req,res)=>{
    res.render('publicacion')
})

router.get('/editarpublicacion',(req,res)=>{
    res.render('editar_publicacion')
})

router.get('/borradorpublicacion',(req,res)=>{
    res.render('borrador_publicacion')
})

module.exports = router;