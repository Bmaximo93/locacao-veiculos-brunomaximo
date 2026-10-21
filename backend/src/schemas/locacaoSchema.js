const z = require("zod");

const locacaoSchema = z.object({
    veiculoId: z.coerce.number("Veículo é obrigatório.").int("Veículo inválido.").positive("Veículo inválido."),
    dataInicio: z.coerce.date("Data de início inválida."),
    dataPrevistaDevolucao: z.coerce.date("Data prevista de devolução inválida.")
});

module.exports = locacaoSchema;
