const connection = require("../config/db");
class notificacion{
    constructor(idRemitente,idDestinatario,idRedirect,tipo,fecha_hora,leido){
        this.idRemitente = idRemitente;
        this.idDestinatario = idDestinatario;
        this.idRedirect = idRedirect;
        this.tipo = tipo;
        this.fecha_hora = fecha_hora;
        this.leido = leido;
    }
    async saveNotificacion(){
        let queryStr = 'INSERT INTO `notificaciones` ( `ID_REMITENTE`,`ID_DESTINATARIO`,`ID_REDIRECT`,`TIPO_NOTIFICACION`,`FECHA_HORA`,`LEIDO`) VALUES (?,?,?,?,?,?)';
        let result, fields;
        [ result, fields ] = await connection.query(
          queryStr,
          [this.idRemitente, this.idDestinatario,this.idRedirect,this.tipo,this.fecha_hora, this.leido],
        );

        return result;
    }

    static async getNotificaciones(id_destinatario){
        let queryStr = 'SELECT * FROM `notificaciones` WHERE `ID_DESTINATARIO`= ?  ';
        let result, fields;
        [ result, fields ] = await connection.query(queryStr,[id_destinatario],);
        return result;
    }
}
module.exports = notificacion;