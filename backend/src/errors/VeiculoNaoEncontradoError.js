const ApiError = require("./ApiError");

class VeiculoNaoEncontradoError extends ApiError {
    constructor(message = "Veículo não encontrado.", statusCode = 404) {
        super(message, statusCode);
    }
}

module.exports = VeiculoNaoEncontradoError;
