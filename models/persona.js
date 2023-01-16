const connection = require("../config/db");
const bcryptjs = require("bcryptjs");
const Publicacion = require('../models/publicacion')
let idPersona;
class User {
  constructor(id,rol, nombre, apellido, foto, email, password, fecha_nac, oficio) {
    this.id = id;
    this.rol = rol;
    this.nombre = nombre;
    this.apellido = apellido;
    this.foto = foto;
    this.email = email;
    this.password = password;
    this.fecha_nac = fecha_nac;
    this.oficio =  oficio;
  }
  async save(){
    //QUERY PERSONAS
    let queryStr = 'INSERT INTO `personas` (`ID_ROL`, `NOMBRE`, `APELLIDO`, `FOTO`,`EMAIL`, `PASSWORD`,`FECHA_NAC`,`OFICIO`) VALUES (?,?,?,?,?,?,?,?)';
        let result, fields;
        [ result, fields ] = await connection.query(
            queryStr,
            [this.rol, this.nombre, this.apellido, this.foto, this.email, this.password, this.fecha_nac, this.oficio ],
        );
        return idPersona = result.insertId;
    }

  static async updateDatosPersonales(id,rol,nombre,apellido,fecha_nac,foto,oficio){
    let queryStr = 'UPDATE `personas`  SET  `ID_ROL`= ?, `NOMBRE`= ?, `APELLIDO`= ?,`FOTO`= ? ,  `FECHA_NAC`= ?,`OFICIO`= ? WHERE `ID_PERSONA` = ?';
    let result, fields;
    [ result, fields ] = await connection.query(
      queryStr,
      [rol,nombre, apellido,foto,fecha_nac,oficio,id],
  );
  } 
  
  static async getUserByEmail(email) {
    let queryStr = "SELECT  `ID_PERSONA`,`ID_ROL`, `NOMBRE`, `APELLIDO`, `FOTO`, `EMAIL`, `PASSWORD`, `FECHA_NAC`, `OFICIO` FROM `personas` WHERE EMAIL = ?";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, [email]);
  
    if (rows.length > 0) {
      return rows;
      
      //let userloged = new User(rows[0]);
    }else{
    }
    return;
  }
  
  static async checkLogin(dataForm) {
    let email = dataForm.email;
    let password = dataForm.password;
    if (email && password) {
      let queryStr = "SELECT * FROM `personas` WHERE `EMAIL` = ?";
      let rows, fields;
      [rows, fields] = await connection.query(queryStr, [email]);
      if (rows.length > 0) {
        if (await bcryptjs.compare(password, rows[0].PASSWORD)) {
          //return new User(rows[0]);
          return new User(
            rows[0].ID_PERSONA,
            rows[0].ID_ROL,
            rows[0].NOMBRE,
            rows[0].APELLIDO,
            rows[0].FOTO,
            rows[0].EMAIL,
            rows[0].PASSWORD,
            rows[0].FECHA_NAC,
            rows[0].OFICIO
          );
        }else{
          return "Contraseña Incorrecta"
        }
      }else{
        return "Error email no existe"
      }
    }
  }



  static async getUserById(id) {
        let queryStr = "SELECT * FROM `personas` WHERE ID_PERSONA = ?";
        let rows, fields;
        [rows, fields] = await connection.query(queryStr, [id]);
        if (rows.length > 0){
          //return new User(rows[0].ID_PERSONA,rows[0].ID_ROL, rows[0].NOMBRE,rows[0].APELLIDO, rows[0].FOTO, rows[0].EMAIL, rows[0].PASSWORD, rows[0].FECHA_NAC, rows[0].OFICIO);
          return rows;
        }
        return;
      }
}

module.exports = User;
