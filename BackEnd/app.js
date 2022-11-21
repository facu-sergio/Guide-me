const express = require("express");
const app = express();
const path = require('node:path');
const routes_index = require('./routes/index');
const routes_users = require('./routes/users');
const routes_publications = require('./routes/publications');
const routes_auth = require('./routes/auth');
const {uuid} = require('uuidv4')

const multer = require('multer');
const storage = multer.diskStorage({
    destination:path.join(__dirname, '/public/uploads'),
    filename:(req,file,cb)=>{
      cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase())
    }
});


//setings
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'/views'));
app.use(express.static('public'));


//sesion
const session = require('express-session')
const cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 1800000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));

app.use(multer({
    storage,
    dest: path.join(__dirname,'/public/uploads'),
    fileFilter: (req, file, cb)=>{
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname =  filetypes.test(path.extname(file.originalname));
      if(mimetype && extname ){
        return cb(null,true)
      }
      cb("Error: seleccione una imagen .jpg, .jpeg o png")
    }
  }).single('image'));


  const { authUserMiddleware } = require('./middlewares/auth_middleware');
  app.use(authUserMiddleware);

//Routes
app.use(routes_index);
app.use(routes_users)
app.use(routes_publications);
app.use(routes_auth);


app.listen(3000);
console.log("server on http://localhost:3000/");
