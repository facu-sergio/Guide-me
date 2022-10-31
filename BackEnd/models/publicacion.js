const connection = require("../config/db");

class publicacion {
  constructor(titulo, empresa, cuerpo) {
    this.titulo = titulo;
    this.empresa = empresa;
    this.cuerpo = cuerpo;
  }

  static async getAll() {
    let queryStr = "SELECT * FROM `publicaciones`";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, []);
    return rows;
  }
}
module.exports = publicacion;