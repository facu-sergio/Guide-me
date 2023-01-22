const comentario = require('../models/comentario');
const Comentario = require('../models/comentario');
const Persona =  require('../models/persona');

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

module.exports.guardarComentario = async(req,res)=>{
    let idpersona = res.locals.userLogged[0].ID_PERSONA;
    let idPublicacion = req.query.idpubli;
    let cuerpo =  req.body.cuerpo;
    let respuestaDe ;
    if(req.query.idcoment){
         respuestaDe = req.query.idcoment
    }else{
         respuestaDe = 0;
    }
    let hora = getFechaHora();
    let newComent =  new Comentario(idpersona,idPublicacion,cuerpo,respuestaDe,hora,0);
    newComent.saveComentario();
    res.send({status:"guardado"})
    //res.redirect(req.get('referer'));;
}

module.exports.getComentarios = async(req,res)=>{
    
    let comentarios =  await Comentario.getComentariosPublicacion(req.query.id);
    let respuestas =  await Comentario.getRespuestasPublicacion(req.query.id);

    let nombresComentarios = [];
    let apellidosComentarios = [];
    let fotosComentarios = [];

    let nombresRespuestas = [];
    let apellidosRespuestas = [];
    let fotosRespuestas = [];


    for(let i=0;i<comentarios.length;i++){
        let persona = await Persona.getUserById(comentarios[i].ID_PERSONA);
        nombresComentarios.push(persona[0].NOMBRE);
        apellidosComentarios.push(persona[0].APELLIDO);
        fotosComentarios.push(persona[0].FOTO);
    }

    for(let i=0;i<respuestas.length;i++){
        let persona = await Persona.getUserById(respuestas[i].ID_PERSONA);
        nombresRespuestas.push(persona[0].NOMBRE);
        apellidosRespuestas.push(persona[0].APELLIDO);
        fotosRespuestas.push(persona[0].FOTO);
    }

    res.send({comentarios,fotosComentarios,nombresComentarios,apellidosComentarios,respuestas,nombresRespuestas,apellidosRespuestas,fotosRespuestas});
}

module.exports.getPersonasComentando = async(req,res)=>{
    let comentarios = comentario.getPersonasComentando(req.query.idComent);
    console.log(comentarios);
}