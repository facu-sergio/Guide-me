const Persona = require('../models//persona');
const bcryptjs = require('bcryptjs');

module.exports.savePersona = async (req,res)=>{
    let rol;
    let password = await bcryptjs.hash(req.body.password, 8);
    if(req.body.oficio==""){
        rol = 1
    }else{
        rol = 2;
    }
    let newPerson = new Persona(rol, req.body.nombre, req.body.apellido, req.file.filename, req.body.email, password, req.body.fecha_nac, req.body.oficio );
    newPerson.save();
    
    for(let i=0;i<req.body.carrera.length;i++){
        Persona.saveEstudios(req.body.carrera[i],req.body.universidad[i])
    }
    res.redirect("/")
}

module.exports.getUser = async (req,res)=>{
    let persona
    let estudios;
    persona = await Persona.getUserByEmail(req.session.user)
    estudios = await Persona.getEstudiosByEmail(req.session.user)
    res.render('mi_perfil',{persona,estudios})
}