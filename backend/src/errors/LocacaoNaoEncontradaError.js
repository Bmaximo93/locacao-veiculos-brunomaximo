const ApiError = require("./ApiError");

class LocacaoNaoEncontradaError extends ApiError {
    constructor(message = "Locação não encontrada.", statusCode = 404) {
        super(message, statusCode);
    }
}

module.exports = LocacaoNaoEncontradaError;
