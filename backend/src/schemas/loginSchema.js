const z = require("zod");

const loginSchema = z.object({
    email: z.email("E-mail inválido.").trim().toLowerCase(),
    senha: z.string("Senha é obrigatória.").min(1, "Senha é obrigatória.")
});

module.exports = loginSchema;
