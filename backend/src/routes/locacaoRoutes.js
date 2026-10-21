const express = require("express");
const locacaoController = require("../controllers/LocacaoController");
const autenticar = require("../middlewares/autenticar");
const validarCorpo = require("../middlewares/validarCorpo");
const locacaoSchema = require("../schemas/locacaoSchema");

const router = express.Router();

router.use(autenticar);

router.post("/", validarCorpo(locacaoSchema), locacaoController.create);

module.exports = router;
