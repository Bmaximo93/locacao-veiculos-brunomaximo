const express = require("express");
const veiculoController = require("../controllers/VeiculoController");
const autenticar = require("../middlewares/autenticar");
const validarCorpo = require("../middlewares/validarCorpo");
const validarId = require("../middlewares/validarId");
const veiculoSchema = require("../schemas/veiculoSchema");

const router = express.Router();

router.use(autenticar);

router.get("/", veiculoController.findMany);
router.get("/:id", validarId, veiculoController.findById);
router.post("/", validarCorpo(veiculoSchema), veiculoController.create);

module.exports = router;
