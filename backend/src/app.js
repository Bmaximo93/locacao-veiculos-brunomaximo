const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");
const veiculoRoutes = require("./routes/veiculoRoutes");
const locacaoRoutes = require("./routes/locacaoRoutes");
const rotaNaoEncontrada = require("./middlewares/rotaNaoEncontrada");
const tratarErros = require("./middlewares/tratarErros");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    return response.status(200).json({ message: "API de Locação de Veículos" });
});

app.use("/usuarios", usuarioRoutes);
app.use("/veiculos", veiculoRoutes);
app.use("/locacoes", locacaoRoutes);

app.use(rotaNaoEncontrada);
app.use(tratarErros);

module.exports = app;
