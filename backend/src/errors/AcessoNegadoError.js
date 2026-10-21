const ApiError = require("./ApiError");

class AcessoNegadoError extends ApiError {
    constructor(message = "Você não tem permissão para acessar esta locação.", statusCode = 403) {
        super(message, statusCode);
    }
}

module.exports = AcessoNegadoError;
