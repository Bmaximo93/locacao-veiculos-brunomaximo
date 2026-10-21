const prisma = require("../databases/prisma");
const PlacaEmUsoError = require("../errors/PlacaEmUsoError");
const VeiculoNaoEncontradoError = require("../errors/VeiculoNaoEncontradoError");

class VeiculoService {

    async findMany(disponivel) {
        const filtro = {};
        if (disponivel !== undefined) {
            filtro.disponivel = disponivel;
        }

        const veiculos = await prisma.veiculo.findMany({
            where: filtro,
            orderBy: { id: "asc" }
        });
        return veiculos;
    }

    async findById(id) {
        const veiculo = await prisma.veiculo.findUnique({
            where: { id: id }
        });
        if (!veiculo) {
            throw new VeiculoNaoEncontradoError();
        }
        return veiculo;
    }

    async create(dados) {
        const placa = dados.placa.replace("-", "");

        const veiculoExistente = await prisma.veiculo.findUnique({
            where: { placa: placa }
        });
        if (veiculoExistente) {
            throw new PlacaEmUsoError();
        }

        const veiculo = await prisma.veiculo.create({
            data: {
                marca: dados.marca,
                modelo: dados.modelo,
                placa: placa,
                ano: dados.ano,
                valorDiaria: dados.valorDiaria
            }
        });
        return veiculo;
    }
}

module.exports = new VeiculoService();
