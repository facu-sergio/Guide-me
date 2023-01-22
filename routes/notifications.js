const express = require("express");
const router = express.Router();
const notificaciones_controller = require('../controllers/notificaciones_controller');

router.post('/savenotificacion',notificaciones_controller.savenotificacion);
router.get('/getnotificaciones',notificaciones_controller.getNotificaciones);

module.exports = router;