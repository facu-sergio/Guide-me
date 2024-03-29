const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth_middleware')
const persona_controller = require('../controllers/persona_controller');
const {authGuestMiddleware} = require("../middlewares/auth_middleware");
const { Router } = require("express");
//rutas para registro de nuevos usuarios
router.get("/registrarse",authGuestMiddleware,persona_controller.getFormRegistro);

router.post("/registrarse", persona_controller.savePersona);

router.get("/miperfil",authMiddleware, persona_controller.getUser)

router.get("/editarperfil",authMiddleware,persona_controller.getPerfil);

router.post("/editarperfil",authMiddleware,persona_controller.editPerfil);

router.get("/mispublicaciones",authMiddleware, persona_controller.misPublicaciones);

router.get("/perfil",persona_controller.verPerfil);

router.get("/islogged",persona_controller.istrue);
router.get("/getpersona",persona_controller.getPersonaFront);
module.exports = router;