const Persona = require('../models//persona');
const Estudio = require('../models/estudios');
const {getFechaHora} = require('../controllers/publicacion_controller')
const bcryptjs = require('bcryptjs');

module.exports.savePersona = async (req,res)=>{
    let existe = await Persona.getUserByEmail(req.body.email);
    if(existe){
        res.render("formulario_registro",{
            alert: true,
				alertTitle: "Registro",
				alertMessage: "¡Error el email esta en uso !",
				alertIcon:'error',
				showConfirmButton: false,
				timer: 2000,
				ruta: 'registrarse'
        })
    }else{
        let rol;
        let password = await bcryptjs.hash(req.body.password, 8);
        if(req.body.oficio==""){
            rol = 3
        }else{
            rol = 2;
        }
        let newPerson = new Persona(rol, req.body.nombre, req.body.apellido, req.file.filename, req.body.email, password, req.body.fecha_nac, req.body.oficio );
        let idPersona  = await newPerson.save();
        for(let i=0;i<req.body.carrera.length;i++){
        Estudio.saveEstudios(req.body.carrera[i],req.body.universidad[i],idPersona);
        res.render("formulario_registro",{
            alert: true,
				alertTitle: "Registro",
				alertMessage: "¡Exitoso!",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: ''
        })
    }
}
    
}

module.exports.getUser = async (req,res)=>{
    let persona
    let estudios;
    persona = await Persona.getUserByEmail(req.session.user);
    estudios = await Estudio.getEstudiosByEmail(req.session.user);
    let fecha = persona[0].FECHA_NAC.toISOString().slice(0, 10);
    res.render('mi_perfil',{persona,estudios,fecha})
}

