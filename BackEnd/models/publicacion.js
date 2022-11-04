const connection = require("../config/db");

class publicacion {
  constructor(idPersona,carrera,titulo, empresa, cuerpo,estado,borradol,fechaHora,moderacion) {
    this.idPersona = idPersona;
    this.carrera = carrera;
    this.titulo = titulo;
    this.empresa = empresa;
    this.cuerpo = cuerpo;
    this.estado = estado;
    this.borradol = borradol;
    this.fechaHora = fechaHora;
    this.moderacion = moderacion;
  }
  async savePublicacion(){
    let queryStr = 'INSERT INTO `publicaciones` (`ID_PERSONA`, `ID_CAR_UPE`, `TITULO`, `EMPRESA`,`CUERPO`,`ESTADO`,`BORRADO_L`,`FECHA_HORA`,`MOTIVO_MODERACION`) VALUES (?,?,?,?,?,?,?,?,?)';
    let result, fields;
    [ result, fields ] = await connection.query(
      queryStr,
      [this.idPersona, this.carrera, this.titulo, this.empresa, this.cuerpo,this.estado, this.borradol, this.fechaHora, this.moderacion ],
  );
  
  }
  static async getAll() {
    let queryStr = "SELECT * FROM `publicaciones`";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, []);
    return rows;
  }
}
module.exports = publicacion;