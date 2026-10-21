const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    return response.status(200).json({ message: "API de Locação de Veículos" });
});

module.exports = app;
