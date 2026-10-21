const ApiError = require("./ApiError");

class PlacaEmUsoError extends ApiError {
    constructor(message = "Já existe um veículo com essa placa.", statusCode = 409) {
        super(message, statusCode);
    }
}

module.exports = PlacaEmUsoError;
