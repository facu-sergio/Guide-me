const connection = require("../config/db");

class publicacion {
  constructor(idPersona,carrera,titulo, empresa, cuerpo,borradol,fechaHora,moderacion) {
    this.idPersona = idPersona;
    this.carrera = carrera;
    this.titulo = titulo;
    this.empresa = empresa;
    this.cuerpo = cuerpo;
    this.borradol = borradol;
    this.fechaHora = fechaHora;
    this.moderacion = moderacion;
  }

  static async getAll() {
    let queryStr = "SELECT * FROM `publicaciones`";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, []);
    return rows;
  }
}
module.exports = publicacion;