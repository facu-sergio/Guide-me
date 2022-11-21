const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth_middleware')
const persona_controller = require('../controllers/persona_controller');
const {authGuestMiddleware} = require("../middlewares/auth_middleware");
//rutas para registro de nuevos usuarios
router.get("/registrarse",authGuestMiddleware,persona_controller.getFormRegistro);

router.post("/registrarse", persona_controller.savePersona);

router.get("/miperfil",authMiddleware, persona_controller.getUser)

router.get("/editarperfil",authMiddleware,persona_controller.getPerfil);

router.post("/editarperfil",authMiddleware,persona_controller.editPerfil);

router.get("/mispublicaciones",authMiddleware, persona_controller.misPublicaciones);

module.exports = router;