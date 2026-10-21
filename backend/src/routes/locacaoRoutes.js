const express = require("express");
const locacaoController = require("../controllers/LocacaoController");
const autenticar = require("../middlewares/autenticar");
const validarCorpo = require("../middlewares/validarCorpo");
const validarId = require("../middlewares/validarId");
const locacaoSchema = require("../schemas/locacaoSchema");

const router = express.Router();

router.use(autenticar);

router.get("/", locacaoController.findMany);
router.get("/:id", validarId, locacaoController.findById);
router.post("/", validarCorpo(locacaoSchema), locacaoController.create);
router.patch("/:id/finalizar", validarId, locacaoController.finalizar);

module.exports = router;
