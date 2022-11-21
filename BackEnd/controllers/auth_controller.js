const Persona = require('../models//persona');

module.exports.login = async (req,res)=>{
    let query = await Persona.checkLogin(req.body)
    if (query == "Error email no existe") {
        res.render("login",{
            alert: true,
				alertTitle: "Login",
				alertMessage: query,
				alertIcon:'error',
				showConfirmButton: false,
				timer: 2000,
				ruta: 'login',
                oldData:req.body
        })
        return
    }
    if (query == "Contraseña Incorrecta") {
        res.render("login",{
            alert: true,
				alertTitle: "Login",
				alertMessage: query,
				alertIcon:'error',
				showConfirmButton: false,
				timer: 2000,
				ruta: 'login',
                oldData:req.body
        })
        return
    };
    
    req.session.user = query.email;
    req.session.rol =  query.rol;
    
    res.render("login",{
        alert: true,
            alertTitle: "Login",
            alertMessage: 'Login exitoso',
            alertIcon:'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: '',
            oldData:''
    });
}

module.exports.logout = async (req,res)=>{
    req.session.destroy();
    res.redirect('/');
}