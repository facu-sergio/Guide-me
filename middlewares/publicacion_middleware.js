const Publicacion =  require('../models/publicacion')
const idMiddleware =  async (req, res, next)=>{
    let publicacion = await  Publicacion.getPublicacion(req.query.id);
    if(publicacion[0].ID_PERSONA==res.locals.userLogged[0].ID_PERSONA){
       next();
    }else{
        res.redirect('/');
    }
}
module.exports = {idMiddleware};