const Publicacion = require('../models/Publicacion');
const Persona = require('../models/persona');

function getFechaHora(){
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = t.getHours();
    const min = t.getMinutes();
    const seg = t.getSeconds();
    let fechaHora = `${year}-${month}-${date} ${hours}:${min}:${seg}`;
    return fechaHora;
}

module.exports.savePublicacion = async(req,res)=>{
    let idUsuario = res.locals.userLogged[0].ID_PERSONA
    let fecha_hora = getFechaHora();
    let nuevaPubli =  new Publicacion(idUsuario,req.body.carrera,req.body.titulo,req.body.empresa,req.body.cuerpo,req.body.estado,null,fecha_hora,null);
    nuevaPubli.savePublicacion();
    res.redirect('/');
}

module.exports.getPublicacion = async(req,res)=>{
    let publicacion = await  Publicacion.getPublicacion(req.query.id);
    let persona = await Persona.getUser(publicacion[0].ID_PERSONA);
    res.render('publicacion',{publicacion,persona});
}

module.exports.getFormulario = async(req,res)=>{
    let carreras = await Publicacion.getCarreras();
    res.render('form-Publicacion',{carreras});
}