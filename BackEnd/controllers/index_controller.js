const publicacion =  require('../models/publicacion');
const Persona = require('../models/persona')


 module.exports.mostrarPublicaciones = async (req,res)=>{
    let publicaciones = await publicacion.getPublicadas();
    let nombres = [];
    let apellidos = [];
    let fotos = [];
    for(let i = 0;i<publicaciones.length;i++){
       let persona = await Persona.getUserById(publicaciones[i].ID_PERSONA);
       fotos.push(persona[0].FOTO)
       nombres.push(persona[0].NOMBRE)
       apellidos.push(persona[0].APELLIDO)
    }
    res.render('index',{publicaciones,fotos,nombres,apellidos});
}
