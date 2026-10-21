const ApiError = require("./ApiError");

class LocacaoJaFinalizadaError extends ApiError {
    constructor(message = "Esta locação já foi finalizada.", statusCode = 409) {
        super(message, statusCode);
    }
}

module.exports = LocacaoJaFinalizadaError;
