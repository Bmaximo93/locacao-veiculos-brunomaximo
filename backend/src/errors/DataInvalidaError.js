const ApiError = require("./ApiError");

class DataInvalidaError extends ApiError {
    constructor(message = "A data prevista de devolução deve ser posterior à data de início.", statusCode = 400) {
        super(message, statusCode);
    }
}

module.exports = DataInvalidaError;
