const express = require("express");
const usuarioController = require("../controllers/UsuarioController");
const autenticar = require("../middlewares/autenticar");
const validarCorpo = require("../middlewares/validarCorpo");
const usuarioSchema = require("../schemas/usuarioSchema");
const loginSchema = require("../schemas/loginSchema");

const router = express.Router();

router.post("/", validarCorpo(usuarioSchema), usuarioController.create);
router.post("/login", validarCorpo(loginSchema), usuarioController.login);
router.get("/perfil", autenticar, usuarioController.perfil);

module.exports = router;
