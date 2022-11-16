const Publicacion = require('../models/Publicacion');
const Persona = require('../models/persona');
const publicacion = require('../models/Publicacion');

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
    let nuevaPubli =  new Publicacion(idUsuario,req.body.carrera,req.body.titulo,req.body.empresa,req.body.cuerpo,req.body.estado,0,fecha_hora,null);
    nuevaPubli.savePublicacion();
    res.redirect('/');
}

module.exports.deletePublicacion = async(req,res)=>{
    let row =  Publicacion.deletePublicacion(req.query.id);
    res.redirect('/mispublicaciones');
}

module.exports.getPublicacion = async(req,res)=>{
    let publicacion = await  Publicacion.getPublicacion(req.query.id);
    let persona = await Persona.getUser(publicacion[0].ID_PERSONA);
    res.render('publicacion',{publicacion,persona});
}

module.exports.getPublicacionByCarrera = async(req,res)=>{
    let publicaciones =  await Publicacion.getPublicacionByCarrera(req.query.id)
    let nombres = [];
    let apellidos = [];
    let fotos = [];
    let carrera = req.query.id;
    for(let i = 0;i<publicaciones.length;i++){
       let persona = await Persona.getUser(publicaciones[i].ID_PERSONA);
       fotos.push(persona[0].FOTO)
       nombres.push(persona[0].NOMBRE)
       apellidos.push(persona[0].APELLIDO)
    }
    res.render('publicaciones_carrera',{publicaciones,fotos,nombres,apellidos,carrera});
}

module.exports.search = async(req,res)=>{
    let publicaciones = await publicacion.getPublicacionByTitulo(req.body.titulo)
    let nombres = [];
    let apellidos = [];
    let fotos = [];
    let carrera = req.query.id;
    for(let i = 0;i<publicaciones.length;i++){
       let persona = await Persona.getUser(publicaciones[i].ID_PERSONA);
       fotos.push(persona[0].FOTO)
       nombres.push(persona[0].NOMBRE)
       apellidos.push(persona[0].APELLIDO)
    }
    res.render('search',{publicaciones,fotos,nombres,apellidos,carrera});
}

module.exports.getFormulario = async(req,res)=>{
    let carreras = await Publicacion.getCarreras();
    res.render('form-Publicacion',{carreras});
}

module.exports.getFormularioEditar = async(req,res)=>{
    let carreras = await Publicacion.getCarreras();
    let publicacion = await Publicacion.getPublicacion(req.query.id);
    res.render('editarPublicacion',{carreras,publicacion});
}

module.exports.editarPublicacion = async(req,res)=>{
    let publicacion = await  Publicacion.updatePublicacion(req.body.id,req.body.carrera,req.body.titulo,req.body.empresa,req.body.cuerpo,req.body.estado);
    res.redirect('/mispublicaciones');
}