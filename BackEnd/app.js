const express = require("express");
const app = express();
const path = require('node:path');
const routes_index = require('./routes/index');
const routes_users = require('./routes/users');
const routes_account = require('./routes/account');
const routes_publications = require('./routes/publications');

//setings
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'/views'));
app.use(express.static('public'));


//Routes
app.use(routes_index);
app.use(routes_users)
app.use(routes_account)
app.use(routes_publications)



app.listen(3000);
console.log("server on http://localhost:3000/");
