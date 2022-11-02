const express = require('express')
const router = express.Router();
const persona = require('../models/persona');
const {authMiddleware} = require("../middlewares/auth_middleware");
const { application } = require('express');
const path = require('node:path');

const aut_controller = require('../controllers/auth_controller')

router.get('/login', (req,res)=>{
    res.render('login');
});

router.post('/login',aut_controller.login);

router.get('/logout', authMiddleware,aut_controller.logout);

module.exports = router;