const express = require("express");
const usuarioController = require("../controllers/UsuarioController");
const validarCorpo = require("../middlewares/validarCorpo");
const usuarioSchema = require("../schemas/usuarioSchema");
const loginSchema = require("../schemas/loginSchema");

const router = express.Router();

router.post("/", validarCorpo(usuarioSchema), usuarioController.create);
router.post("/login", validarCorpo(loginSchema), usuarioController.login);

module.exports = router;
