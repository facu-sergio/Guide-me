const connection = require("../config/db");
const { use } = require("../routes");
const bcryptjs = require("bcryptjs");
class User {
  constructor(rol, nombre, apellido, foto, email, password, fecha_nac, oficio, carrera, universidad) {
    this.rol = rol;
    this.nombre = nombre;
    this.apellido = apellido;
    this.foto = foto;
    this.email = email;
    this.password = password;
    this.fecha_nac = fecha_nac;
    this.oficio =  oficio;
    this.carrera =  carrera;
    this.universidad =  universidad;
  }
  async save(){
    //QUERY PERSONAS
    let queryStr = 'INSERT INTO `personas` (`ID_ROL`, `NOMBRE`, `APELLIDO`, `FOTO`,`EMAIL`, `PASSWORD`,`FECHA_NAC`,`OFICIO`) VALUES (?,?,?,?,?,?,?,?)';
        let result, fields;
        [ result, fields ] = await connection.query(
            queryStr,
            [this.rol, this.nombre, this.apellido, this.foto, this.email, this.password, this.fecha_nac, this.oficio ],
        );
        let idPersona = result.insertId;

        //query estudios
        let queryStr2 = 'INSERT INTO `estudios` (`NOMBRE_CARRERA`, `UNIVERSIDAD`) VALUES (?,?)';
        let result2, fields2;
        [ result2, fields2 ] = await connection.query(
            queryStr2,
            [this.carrera,this.universidad ],
        );
        let idEstudios = result2.insertId;
        
       ///query tabla pivot
        let queryStr3 = 'INSERT INTO `persona_estudios` (`ID_PERSONA`, `ID_ESTUDIO`) VALUES (?,?)';
        let result3, fields3;
        [ result3, fields3 ] = await connection.query(
            queryStr3,
            [idPersona,idEstudios ],
        );
        return this;
    }
  static async saveEstudios(nombre,universidad){
    let queryStr = 'INSERT INTO `estudios` (`NOMBRE_CARRERA`, `UNIVERSIDAD`) VALUES (?,?)';
        let result, fields;
        [ result, fields ] = await connection.query(
            queryStr,
            [nombre,universidad ],
        );
        this.id = result.insertId;
        return this;
  }
  
  static async getUserByEmail(email) {
    let queryStr = "SELECT  `ID_ROL`, `NOMBRE`, `APELLIDO`, `FOTO`, `EMAIL`, `PASSWORD`, `FECHA_NAC`, `OFICIO` FROM `personas` WHERE EMAIL = ?";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, [email]);
  
    if (rows.length > 0) {
      console.log("traigo resultados")
      return rows;
      
      //let userloged = new User(rows[0]);
    }else{
      console.log("NO traigo resultados")
    }
    return;
  }
  static async getEstudiosByEmail(email) {
    let queryStr =
      "SELECT estudios.* FROM estudios INNER JOIN persona_estudios ON estudios.ID_ESTUDIO = persona_estudios.ID_ESTUDIO INNER JOIN personas ON persona_estudios.ID_PERSONA = personas.ID_PERSONA WHERE (personas.EMAIL = ?);";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, [email]);
    return rows;
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
            rows[0].ID_ROL,
            rows[0].NOMBRE,
            rows[0].APELLIDO,
            rows[0].FOTO,
            rows[0].EMAIL,
            rows[0].PASSWORD,
            rows[0].FECHA_NAC,
            rows[0].OFICIO
          );
        }
      }
    }
  }


/* static async getEstudios(id) {
        let queryStr = "SELECT estudios.* FROM estudios INNER JOIN persona_estudios ON estudios.ID_ESTUDIOS = persona_estudios.ID_ESTUDIOS INNER JOIN personas ON persona_estudios.ID_PERSONA = personas.ID_PERSONA WHERE (personas.ID_PERSONA = ?);";
        let rows, fields;
        [rows, fields] = await connection.query(queryStr, [id]);
        return rows;
      }*/

  /* static async getUser(id) {
        let queryStr = "SELECT * FROM `personas` WHERE ID_PERSONA = ?";
        let rows, fields;
        [rows, fields] = await connection.query(queryStr, [id]);
        if (rows.length > 0){
          //return new User(rows[0].ID_PERSONA,rows[0].ID_ROL, rows[0].NOMBRE,rows[0].APELLIDO, rows[0].FOTO, rows[0].EMAIL, rows[0].PASSWORD, rows[0].FECHA_NAC, rows[0].OFICIO);
          return rows;
        }
        return;
      }*/
}

module.exports = User;
