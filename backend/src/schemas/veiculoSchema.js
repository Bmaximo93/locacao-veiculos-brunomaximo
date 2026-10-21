const z = require("zod");

const anoMaximo = new Date().getFullYear() + 1;

const veiculoSchema = z.object({
    marca: z.string("Marca é obrigatória.").trim().min(2, "Marca deve ter pelo menos 2 caracteres."),
    modelo: z.string("Modelo é obrigatório.").trim().min(1, "Modelo é obrigatório."),
    placa: z.string("Placa é obrigatória.").trim().toUpperCase().regex(/^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/, "Placa inválida. Use o formato ABC1234 ou ABC1D23."),
    ano: z.coerce.number("Ano é obrigatório.").int("Ano deve ser um número inteiro.").min(1950, "Ano inválido.").max(anoMaximo, "Ano inválido."),
    valorDiaria: z.coerce.number("Valor da diária é obrigatório.").positive("Valor da diária deve ser positivo.")
});

module.exports = veiculoSchema;
