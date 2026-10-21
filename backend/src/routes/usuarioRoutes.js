const express = require("express");
const usuarioController = require("../controllers/UsuarioController");
const validarCorpo = require("../middlewares/validarCorpo");
const usuarioSchema = require("../schemas/usuarioSchema");

const router = express.Router();

router.post("/", validarCorpo(usuarioSchema), usuarioController.create);

module.exports = router;
