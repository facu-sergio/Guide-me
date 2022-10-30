const express = require('express')
const router = express.Router();

const classUser = require('../models/users');

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login', async (req, res) => {
    let user = await classUser.checkLogin(req.body.email, req.body.password);
    if (user) {
        req.session.user = user.id;
        console.log('logueo TODO BIEN');
        res.redirect('home');
    } else {
        console.log('logueo TODO MAL');
        res.redirect('login');
    }
});
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})
module.exports = router;