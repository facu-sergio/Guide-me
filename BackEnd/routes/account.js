const express = require("express");
const router = express.Router();



router.get("/registrarse",(req,res)=>{
    res.render("formulario_registro")
})

module.exports = router;
