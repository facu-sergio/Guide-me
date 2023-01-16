const Comentario = require('../models/comentario');

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
    let idPublicacion = req.body.idpubli;
    let cuerpo =  req.body.cuerpo;
    let hora = getFechaHora();
    let newComent =  new Comentario(idpersona,idPublicacion,cuerpo,0,hora,0);
    newComent.saveComentario();
    res.redirect(req.get('referer'));;
}

module.exports.guardarRespuesta = async(req,res)=>{
    let idpersona = res.locals.userLogged[0].ID_PERSONA;
    let idPublicacion =  req.query.publi;
    let cuerpo =  req.body.cuerpo;
    let respuestaDe = req.query.comen;
    let hora = getFechaHora();
    let newComent =  new Comentario(idpersona,idPublicacion,cuerpo,respuestaDe,hora,0);
    newComent.saveComentario();
    res.redirect(req.get('referer'));
}