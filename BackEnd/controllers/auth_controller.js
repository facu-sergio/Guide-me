const Persona = require('../models//persona');

module.exports.login = async (req,res)=>{
    let user = await Persona.checkLogin(req.body)
    if (user) {
        req.session.user = user.email;
        req.session.rol =  user.rol;
        res.redirect('/');
    } else {
        res.redirect('login');
    }
}

module.exports.logout = async (req,res)=>{
    req.session.destroy();
    res.redirect('/');
}