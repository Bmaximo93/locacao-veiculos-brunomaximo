const z = require("zod");

const usuarioSchema = z.object({
    nome: z.string("Nome é obrigatório.").trim().min(3, "Nome deve ter pelo menos 3 caracteres."),
    email: z.email("E-mail inválido.").trim().toLowerCase(),
    senha: z.string("Senha é obrigatória.").min(6, "Senha deve ter pelo menos 6 caracteres.")
});

module.exports = usuarioSchema;
