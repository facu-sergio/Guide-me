const express = require("express");
const router = express.Router();

router.get("/miperfil", (req, res) => {
  res.render("mi_perfil");
});

router.get("/editarperfil",(req,res)=>{
  res.render("editar_perfil");
})

router.get("/mispublicaciones",(req,res)=>{
  res.render("misPublicaciones");
})

module.exports = router;