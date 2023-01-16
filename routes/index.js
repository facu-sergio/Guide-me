const express = require('express');
const router =  express.Router();
const index_controller = require('../controllers/index_controller');

router.get('/index',index_controller.mostrarPublicaciones);

module.exports = router;