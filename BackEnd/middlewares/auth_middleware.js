const User = require('../models/persona');

//verifica si hay session si no te manda al login
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        // res.sendStatus(401);
        res.redirect('/login');
    }
};

const authGuestMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        res.redirect('home');
    } else {
        next();
    }
};

const authUserMiddleware =  async (req, res, next)=>{
    if (req.session && req.session.user) {
        let userLoggedEmail = req.session.user;
        if (userLoggedEmail) {
            let userLogged = await User.getUserByEmail(userLoggedEmail);
            res.locals.userLogged = userLogged;          
        }
    }
    next();
}

module.exports = {authMiddleware,authUserMiddleware,authGuestMiddleware};