const Persona = require('../models//persona');

module.exports.getUser = async (req,res)=>{
    console.log(req.session.user)
    let persona
    let estudios;
    persona = await Persona.getUserByEmail(req.session.user)
    estudios = await Persona.getEstudiosByEmail(req.session.user)
    console.log(estudios)
    res.render('mi_perfil',{persona,estudios})
}