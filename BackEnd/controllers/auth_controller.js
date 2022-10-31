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
    let newPerson = new Persona(rol, req.body.nombre, req.body.apellido, req.file.filename, req.body.email, password, req.body.fecha_nac, req.body.oficio , req.body.carrera, req.body.universidad);
    newPerson.save();
    res.redirect("/")
}