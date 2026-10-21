const ApiError = require("./ApiError");

class VeiculoIndisponivelError extends ApiError {
    constructor(message = "Veículo indisponível para locação.", statusCode = 409) {
        super(message, statusCode);
    }
}

module.exports = VeiculoIndisponivelError;
