const ApiError = require("./ApiError");

class NaoAutenticadoError extends ApiError {
    constructor(message = "Usuário não autenticado.", statusCode = 401) {
        super(message, statusCode);
    }
}

module.exports = NaoAutenticadoError;
