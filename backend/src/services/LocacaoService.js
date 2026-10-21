const prisma = require("../databases/prisma");
const veiculoService = require("./VeiculoService");
const DataInvalidaError = require("../errors/DataInvalidaError");
const VeiculoIndisponivelError = require("../errors/VeiculoIndisponivelError");

const UM_DIA_EM_MS = 24 * 60 * 60 * 1000;

class LocacaoService {

    calcularDiarias(dataInicio, dataPrevistaDevolucao) {
        const diferenca = dataPrevistaDevolucao.getTime() - dataInicio.getTime();
        return Math.ceil(diferenca / UM_DIA_EM_MS);
    }

    async create(usuarioId, dados) {
        const { veiculoId, dataInicio, dataPrevistaDevolucao } = dados;

        if (dataPrevistaDevolucao <= dataInicio) {
            throw new DataInvalidaError();
        }

        const veiculo = await veiculoService.findById(veiculoId);
        if (!veiculo.disponivel) {
            throw new VeiculoIndisponivelError();
        }

        const diarias = this.calcularDiarias(dataInicio, dataPrevistaDevolucao);
        const valorTotal = diarias * Number(veiculo.valorDiaria);

        const locacao = await prisma.$transaction(async (tx) => {
            const resultado = await tx.veiculo.updateMany({
                where: { id: veiculoId, disponivel: true },
                data: { disponivel: false }
            });
            if (resultado.count === 0) {
                throw new VeiculoIndisponivelError();
            }

            return tx.locacao.create({
                data: {
                    usuarioId: usuarioId,
                    veiculoId: veiculoId,
                    dataInicio: dataInicio,
                    dataPrevistaDevolucao: dataPrevistaDevolucao,
                    valorTotal: valorTotal
                },
                include: { veiculo: true }
            });
        });

        return locacao;
    }
}

module.exports = new LocacaoService();
