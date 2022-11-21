const Persona = require('../models//persona');
const Estudio = require('../models/estudios');
const Publicacion = require('../models/publicacion');
const bcryptjs = require('bcryptjs');

module.exports.getFormRegistro = async (req,res)=>{
    res.render("formulario_registro",{errors:'',oldData:''})
}
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
            oldData:req.body,
        })
    }else{
        let rol;
        let password = await bcryptjs.hash(req.body.password, 8);
        if(req.body.oficio==""){
            rol = 3
        }else{
            rol = 2;
        }
        let newPerson = new Persona(null,rol, req.body.nombre, req.body.apellido, req.file.filename, req.body.email, password, req.body.fecha_nac, req.body.oficio );
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
				ruta: '',
                oldData:'',
        })
    }
}
}

module.exports.misPublicaciones =  async (req,res)=>{
    let publicaciones = await Publicacion.getMisPublicaciones(res.locals.userLogged[0].ID_PERSONA);
    let publicadas = [];
    let borradores = [];
    for(let i = 0;i<publicaciones.length;i++){
        if(publicaciones[i].ESTADO=='publicada'){
            publicadas.push(publicaciones[i]);
        }
        if(publicaciones[i].ESTADO=='borrador'){
            borradores.push(publicaciones[i])
        }
    }
    let nombre = res.locals.userLogged[0].NOMBRE;
    let apellido = res.locals.userLogged[0].APELLIDO;
    let foto = res.locals.userLogged[0].FOTO;
    res.render('misPublicaciones',{publicadas,borradores,nombre,apellido,foto});
}

module.exports.getUser = async (req,res)=>{
    let persona
    let estudios;
    persona = await Persona.getUserByEmail(req.session.user);
    estudios = await Estudio.getEstudiosByEmail(req.session.user);
    let fecha = persona[0].FECHA_NAC.toISOString().slice(0, 10);
    res.render('mi_perfil',{persona,estudios,fecha})
}

module.exports.getPerfil= async(req,res)=>{
    persona = await Persona.getUserByEmail(req.session.user);
    let fecha = persona[0].FECHA_NAC.toISOString().slice(0, 10);
    estudios = await Estudio.getEstudiosByEmail(req.session.user);
    foto = res.locals.userLogged[0].FOTO;
    res.render('editar_perfil',{persona,fecha,estudios,foto});
}

module.exports.editPerfil  = async(req,res)=>{
    let id =  res.locals.userLogged[0].ID_PERSONA;
    if(req.file){
        foto = req.file.filename;
    }else{
        foto =  res.locals.userLogged[0].FOTO;
    }

    if(req.body.oficio==""){
        rol = 3
    }else{
        rol = 2;
    }
    Persona.updateDatosPersonales(id,rol,req.body.nombre,req.body.apellido,req.body.fecha_nac,foto,req.body.oficio);
    let idPersona  = res.locals.userLogged[0].ID_PERSONA;

    if(req.body.carrera){
        for(let i=0;i<req.body.carrera.length;i++){
            Estudio.saveEstudios(req.body.carrera[i],req.body.universidad[i],idPersona);
        }
    }
    res.redirect('/miperfil');
}
