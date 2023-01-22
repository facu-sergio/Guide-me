const  Notificacion = require('../models/notificaciones')

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
module.exports.savenotificacion = async(req,res)=>{
    let hora =  getFechaHora();
    let newNotificacion =  new Notificacion(req.body.idRemitente,req.body.idDestinatario,req.body.idRedirect,req.body.tipo,hora,0);
    newNotificacion.saveNotificacion();
}

module.exports.getNotificaciones = async(req,res)=>{
    console.log(req.body)
    let notificaciones = await Notificacion.getNotificaciones(req.query.idPersona);
    res.send(notificaciones);
}