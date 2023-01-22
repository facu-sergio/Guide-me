const connection = require("../config/db");

class like{
    constructor(idPersona,idPublicacion,fecha_hora,borrado_l){
        this.idPersona = idPersona;
        this.idPublicacion = idPublicacion;
        this.fecha_hora = fecha_hora;
        this.borrado_l = borrado_l;
    }
    
    async saveLike(){
    let queryStr = 'INSERT INTO `me_gustas` (`ID_PERSONA`, `ID_PUBLICACION`,`FECHA_HORA`,`BORRADO_L`) VALUES (?,?,?,?)';
    let result, fields;
    [ result, fields ] = await connection.query(
      queryStr,
      [this.idPersona, this.idPublicacion, this.fecha_hora, this.borrado_l],
    );
    }

    static async deleteLike(idPersona,idPublicacion){
      let queryStr  = "DELETE  FROM `me_gustas`  WHERE `ID_PERSONA`= ? AND `ID_PUBLICACION` = ?"
      let result, fields;
      [ result, fields ] = await connection.query(queryStr,[idPersona,idPublicacion],);
      return result;
    }

    static async getLikesPublicacion(idPublicacion){
    let queryStr = "SELECT * FROM `me_gustas` WHERE `ID_PUBLICACION` = ?"
    let rows, fields;
    [rows, fields] = await connection.query(queryStr,[idPublicacion]);
    return rows;
    } 
    
    static async userLike(idPublicacion,idPersona){
      let queryStr = "SELECT * FROM `me_gustas` WHERE  `ID_PUBLICACION`= ? AND `ID_PERSONA` = ?"
      let rows, fields;
      [rows,fields] = await connection.query(queryStr,[idPublicacion,idPersona]);
      return rows;
    }
}


module.exports  = like;