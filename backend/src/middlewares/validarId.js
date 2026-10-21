const validarId = (request, response, next) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return response.status(400).json({ message: "Id inválido." });
    }
    next();
};

module.exports = validarId;
