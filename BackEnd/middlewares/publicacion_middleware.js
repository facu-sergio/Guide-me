const Publicacion =  require('../models/publicacion')

const idMiddleware =  async (req, res, next)=>{
    let publicacion = await  Publicacion.getPublicacion(req.query.id);
    console.log("---id Persona logeada--")

    console.log(res.locals.userLogged[0].ID_PERSONA)

    console.log("---id persona Publicacion--")
    console.log(publicacion[0])

    if(publicacion[0].ID_PERSONA==res.locals.userLogged[0].ID_PERSONA){
       next();
    }else{
        res.redirect('/');
    }
}

module.exports = {idMiddleware};