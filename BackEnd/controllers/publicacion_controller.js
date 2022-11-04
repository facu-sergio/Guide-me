const publicacion = require('../models/publicacion');

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
    console.log(req.body)
    let idUsuario = res.locals.userLogged[0].ID_PERSONA
    let fecha_hora = getFechaHora();
    let nuevaPubli =  new publicacion(idUsuario,req.body.carrera,req.body.titulo,req.body.empresa,req.body.cuerpo,req.body.estado,null,fecha_hora,null);
    nuevaPubli.savePublicacion();
    res.redirect('/');
}