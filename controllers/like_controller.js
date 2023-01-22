const Like = require('../models/like');

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

module.exports.getMegustas = async(req,res)=>{
    let likes = await Like.getLikesPublicacion(req.query.idpubli);
    res.send(likes)
}

module.exports.userLikes = async(req,res)=>{
    let likes = await Like.userLike(req.query.idpubli,req.query.idpersona);
    res.send(likes); 
}

module.exports.saveMegusta = async(req,res)=>{
    let fechaHora = getFechaHora();
    let like =  new Like(req.query.idpersona,req.query.idpubli,fechaHora,0);
    like.saveLike();
    res.json({ message: 'El me gusta se ha guardado correctamente' });
}

module.exports.deleteMegusta = async(req,res)=>{
    Like.deleteLike(req.query.idpersona,req.query.idpubli);
    res.json({ message: 'El me gusta se ha borrado correctamente' });
}

