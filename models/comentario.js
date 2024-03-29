const connection = require("../config/db");

class comentario{
    constructor(idPersona,idPublicacion,cuerpo,respuestaDe,fecha_hora,borrado_l){
        this.idPersona = idPersona;
        this.idPublicacion = idPublicacion;
        this.cuerpo = cuerpo;
        this.respuestaDe =  respuestaDe;
        this.fecha_hora = fecha_hora;
        this.borrado_l = borrado_l;
    }

    async saveComentario(){
        let queryStr = 'INSERT INTO `comentarios` (`ID_PERSONA`, `ID_PUBLICACION`, `CUERPO`, `EN_RESPUESTA_DE`, `FECHA_HORA`,`BORRADO_L`) VALUES (?,?,?,?,?,?)';
        let result, fields;
    [ result, fields ] = await connection.query(
      queryStr,
      [this.idPersona, this.idPublicacion, this.cuerpo,this.respuestaDe, this.fecha_hora, this.borrado_l],
    );
    }

    static async getComentariosPublicacion(idPublicacion){
        let queryStr = "SELECT * FROM `comentarios` WHERE `ID_PUBLICACION` = ? AND `EN_RESPUESTA_DE`= 0 "
        let rows, fields;
    [rows, fields] = await connection.query(queryStr,[idPublicacion]);
    return rows;
    }
    static async getRespuestasPublicacion(idPublicacion){
    let queryStr = "SELECT * FROM `comentarios` WHERE `ID_PUBLICACION` = ? AND `EN_RESPUESTA_DE`!= 0 "
    let rows, fields;
    [rows, fields] = await connection.query(queryStr,[idPublicacion]);
    return rows;
    }

    static async getPersonasComentando(idcoment){
        let queryStr = "SELECT * FROM `comentarios` WHERE `EN_RESPUESTA_DE` = ?  "
        let rows, fields;
        [rows, fields] = await connection.query(queryStr,[idcoment]);
        return rows;
    }

    static async updateComentario(cuerpo,idComent){
        let queryStr = 'UPDATE `comentarios`  SET  `CUERPO`= ? WHERE `ID_COMENTARIO` = ?';
        let result, fields;
        [ result, fields ] = await connection.query(
        queryStr,
        [cuerpo,idComent],
        );
    }

    static async deleteComentario(idComent){
        let queryStr = 'DELETE FROM `comentarios`  WHERE `ID_COMENTARIO` = ?';
        let result, fields;
        [ result, fields ] = await connection.query(
        queryStr,
        [idComent],
        );
        return result;
    }
}

module.exports = comentario;