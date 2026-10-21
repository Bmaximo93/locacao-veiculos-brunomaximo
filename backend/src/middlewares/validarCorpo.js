const validarCorpo = (schema) => {
    return (request, response, next) => {
        const result = schema.safeParse(request.body);
        if (!result.success) {
            const erros = result.error.issues.map((issue) => {
                return {
                    campo: issue.path[0],
                    message: issue.message
                };
            });
            return response.status(400).json({ message: "Dados inválidos.", erros });
        }
        request.body = result.data;
        next();
    };
};

module.exports = validarCorpo;
