const express = require('express')
const router = express.Router();
const {authGuestMiddleware} = require("../middlewares/auth_middleware");

const aut_controller = require('../controllers/auth_controller')

router.get('/login',authGuestMiddleware, (req,res)=>{
    res.render('login', {oldData:''});
});

router.post('/login', aut_controller.login);

router.get('/logout',aut_controller.logout);

module.exports = router;