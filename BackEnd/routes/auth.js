const express = require('express')
const router = express.Router();
const persona = require('../models/persona');
const controller_auth =  require('../controllers/auth_controller')
const {authMiddleware} = require("../middlewares/auth_middleware");
const { application } = require('express');
const path = require('node:path');





router.get('/login', (req,res)=>{
    res.render('login');
});


router.post('/login',async (req, res) => {
    let user = await persona.checkLogin(req.body)
    if (user) {
        req.session.user = user.email;
        res.redirect('/');
    } else {
        res.redirect('login');
    }
});

router.get('/logout', authMiddleware, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});



router.get("/registrarse",(req,res)=>{
    res.render("formulario_registro")
})

router.post("/registrarse", controller_auth.savePersona);

module.exports = router;