const connection = require("../config/db");
const resultsPerPage = 8;
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

  static async updatePublicacion(idpublicacion,carrera,titulo,empresa,cuerpo,estado){
    let queryStr = 'UPDATE `publicaciones`  SET  `ID_CAR_UPE`= ?, `TITULO`= ?,`EMPRESA`= ? , `CUERPO`= ? , `ESTADO` = ? WHERE `ID_PUBLICACION` = ?';
    let result, fields;
    [ result, fields ] = await connection.query(
      queryStr,
      [carrera, titulo, empresa, cuerpo,estado,idpublicacion],
  );
  }

  static async getPublicadas() {
    let queryStr = "SELECT * FROM `publicaciones` WHERE `ESTADO`= ? AND `BORRADO_L` = 0 ORDER BY `ID_PUBLICACION` DESC ";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, ["publicada"]);
    return rows;
  }

  static async getPublicacion(id){
    let queryStr = "SELECT * FROM `publicaciones` WHERE`ID_PUBLICACION`= ? AND `BORRADO_L` = 0";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, [id]);
    return rows;
  }
  static async getTenpublics(page){
    let offset = (page-1)*resultsPerPage;
    let queryStr = "SELECT * FROM `publicaciones` WHERE `ESTADO`= ? AND `BORRADO_L` = 0 ORDER BY `ID_PUBLICACION` DESC LIMIT ? OFFSET ?";
    let rows, fields;
    [rows,fields] =  await connection.query(queryStr,["publicada",resultsPerPage,offset]);
    return rows;
  }
  static async getCarreras(){
    let queryStr = "SELECT * FROM `carreras_upe`";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, []);
    return rows;
  }

  static async getPublicacionByCarrera(idCarrera){
    let queryStr = "SELECT * FROM `publicaciones` where `ID_CAR_UPE`= ? AND `BORRADO_L` = 0";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr, [idCarrera]);
    return rows;
  }

  static async getPublicacionByTitulo(titulo){
    let queryStr = "SELECT * FROM `publicaciones`WHERE `TITULO` LIKE ? AND `BORRADO_L` = 0";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr,['%'+titulo+'%']);
    return rows;
  }

  static async getMisPublicaciones(idpersona){
    let queryStr = "SELECT * FROM `publicaciones` WHERE `ID_persona` = ? AND `BORRADO_L` = 0";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr,[idpersona]);
    return rows;
  }

  static async deletePublicacion(idpublicacion){
    let queryStr = "UPDATE `publicaciones`  SET  `BORRADO_L` = 1 WHERE `ID_PUBLICACION` = ?";
    let rows, fields;
    [rows, fields] = await connection.query(queryStr,[idpublicacion]);
    return rows;
  }

}
module.exports = publicacion;