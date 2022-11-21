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
    let errors = validarDatos(req.body);
    if(Object.keys(errors).length>0){
        let carreras = await Publicacion.getCarreras();
        res.render('form-publicacion',{errors,oldData:req.body,carreras});
    }else{
        let idUsuario = res.locals.userLogged[0].ID_PERSONA
        let fecha_hora = getFechaHora();
        let nuevaPubli =  new Publicacion(idUsuario,req.body.carrera,req.body.titulo,req.body.empresa,req.body.cuerpo,req.body.estado,0,fecha_hora,null);
        nuevaPubli.savePublicacion();
        res.redirect('/');
    }
}

module.exports.deletePublicacion = async(req,res)=>{
    let row =  Publicacion.deletePublicacion(req.query.id);
    res.redirect('/mispublicaciones');
}

module.exports.getPublicacion = async(req,res)=>{
    let publicacion = await  Publicacion.getPublicacion(req.query.id);
    let persona = await Persona.getUserById(publicacion[0].ID_PERSONA);
    res.render('publicacion',{publicacion,persona});
}

module.exports.getPublicacionByCarrera = async(req,res)=>{
    let publicaciones =  await Publicacion.getPublicacionByCarrera(req.query.id)
    let nombres = [];
    let apellidos = [];
    let fotos = [];
    let carrera = req.query.id;
    for(let i = 0;i<publicaciones.length;i++){
       let persona = await Persona.getUserById(publicaciones[i].ID_PERSONA);
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
       let persona = await Persona.getUserById(publicaciones[i].ID_PERSONA);
       fotos.push(persona[0].FOTO)
       nombres.push(persona[0].NOMBRE)
       apellidos.push(persona[0].APELLIDO)
    }
    res.render('search',{publicaciones,fotos,nombres,apellidos,carrera});
}

module.exports.getFormulario = async(req,res)=>{
    let carreras = await Publicacion.getCarreras();
    res.render('form-Publicacion',{carreras,errors:'',oldData:''});
}

module.exports.getFormularioEditar = async(req,res)=>{
    let carreras = await Publicacion.getCarreras();
    let publicacion = await Publicacion.getPublicacion(req.query.id);
    res.render('editarPublicacion',{carreras,publicacion,errors:''});
}

module.exports.editarPublicacion = async(req,res)=>{
    let errors = validarDatos(req.body);
    if(Object.keys(errors).length>0){
        let publicacion = await Publicacion.getPublicacion(req.query.id);
        let carreras = await Publicacion.getCarreras();
        res.render('editarPublicacion',{errors,carreras,publicacion});
    }else{
        let publicacion = await  Publicacion.updatePublicacion(req.body.id,req.body.carrera,req.body.titulo,req.body.empresa,req.body.cuerpo,req.body.estado);
        res.redirect('/mispublicaciones');
    }
    
}

let validarDatos= (data)=>{
    let errors = {
        titulo : [],
        empresa : [],
        carrera: [],
        cuerpo: [],
        estado: []
    }

    if(!data.titulo){
        errors.titulo.push('El campo titulo es obligatorio');
    }else{
        if(data.titulo.length>35){
            errors.titulo.push('El campo titulo no puede tener mas de 35 caracteres');
        }
    }

    if(!data.empresa){
        errors.empresa.push('el campo empresa es obligatorio');
    }else{
        if(data.empresa.length>200){
            errors.empresa.push('El campo empresa no puede tener mas de 200 caracteres');
        }
    }

    if(!data.carrera){
        errors.carrera.push('el campo carrera es obligatorio');
    }

    if(!data.cuerpo){
        errors.cuerpo.push('el campo cuerpo es obligatorio');
    }
    
    if(!data.estado){
        errors.estado.push('el campo estado es obligatorio');
    }
    for(let key of Object.keys(errors)){
        if(errors[key].length==0){
            delete errors[key];
        }
    }

    return errors;
}

