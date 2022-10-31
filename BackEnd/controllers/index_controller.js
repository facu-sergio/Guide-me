const publicacion =  require('../models/publicacion');
 module.exports.mostrar = async (req,res)=>{
    const rows = await publicacion.getAll();
    res.render('index',{rows});
}
