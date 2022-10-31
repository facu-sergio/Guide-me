const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth_middleware')
const persona_controller = require('../controllers/persona_controller');



router.get("/miperfil",authMiddleware, persona_controller.getUser)

router.get("/editarperfil",(req,res)=>{
  res.render("editar_perfil");
})

router.get("/mispublicaciones",(req,res)=>{
  res.render("misPublicaciones");
})

module.exports = router;