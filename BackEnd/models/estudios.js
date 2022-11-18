const connection = require("../config/db");

class Estudio {
  constructor(carrera, universidad) {
    this.carrera = carrera;
    this.universidad = universidad;
  }
  static async saveEstudios(nombre,universidad,idPersona,){
    //query estudios
    let queryStr2 = 'INSERT INTO `estudios` (`NOMBRE_CARRERA`, `UNIVERSIDAD`) VALUES (?,?)';
    let result2, fields2;
    [ result2, fields2 ] = await connection.query(
        queryStr2,
        [nombre,universidad ],
    );
    let idEstudios = result2.insertId;
    
   ///query tabla pivot
    let queryStr3 = 'INSERT INTO `persona_estudios` (`ID_PERSONA`, `ID_ESTUDIO`) VALUES (?,?)';
    let result3, fields3;
    [ result3, fields3 ] = await connection.query(
        queryStr3,
        [idPersona,idEstudios],
    );
    return this;
  }
  static async getEstudiosByEmail(email) {
    let queryStr =
      "SELECT estudios.* FROM estudios INNER JOIN persona_estudios ON estudios.ID_ESTUDIO = persona_estudios.ID_ESTUDIO INNER JOIN personas ON persona_estudios.ID_PERSONA = personas.ID_PERSONA WHERE (personas.EMAIL = ?);";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, [email]);
    return rows;
  }

 /* static async getEstudiosById(id) {
    let queryStr = "SELECT estudios.* FROM estudios INNER JOIN persona_estudios ON estudios.ID_ESTUDIO = persona_estudios.ID_ESTUDIO INNER JOIN personas ON persona_estudios.ID_PERSONA = personas.ID_PERSONA WHERE (personas.ID_PERSONA = ?);";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, [id]);
    return rows;
}*/

}



module.exports = Estudio;
