const express = require("express");
const router = express.Router();

router.get('/crearpublicacion',(req,res)=>{
    res.render('form-publicacion')
})

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