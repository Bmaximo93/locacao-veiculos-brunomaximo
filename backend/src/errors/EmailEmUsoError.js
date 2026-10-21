const ApiError = require("./ApiError");

class EmailEmUsoError extends ApiError {
    constructor(message = "E-mail já cadastrado.", statusCode = 409) {
        super(message, statusCode);
    }
}

module.exports = EmailEmUsoError;
