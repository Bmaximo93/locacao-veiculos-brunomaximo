const ApiError = require("../errors/ApiError");

const tratarErros = (error, request, response, next) => {
    if (error instanceof ApiError) {
        return response.status(error.statusCode).json({ message: error.message });
    }
    if (error.type === "entity.parse.failed") {
        return response.status(400).json({ message: "JSON inválido no corpo da requisição." });
    }
    if (error.code === "P2002") {
        return response.status(409).json({ message: "Registro já cadastrado." });
    }
    console.error(error);
    return response.status(500).json({ message: "Erro interno do servidor." });
};

module.exports = tratarErros;
