const prisma = require("../databases/prisma");
const veiculoService = require("./VeiculoService");
const DataInvalidaError = require("../errors/DataInvalidaError");
const VeiculoIndisponivelError = require("../errors/VeiculoIndisponivelError");
const LocacaoNaoEncontradaError = require("../errors/LocacaoNaoEncontradaError");
const AcessoNegadoError = require("../errors/AcessoNegadoError");
const LocacaoJaFinalizadaError = require("../errors/LocacaoJaFinalizadaError");

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

    async findMany(usuarioId) {
        const locacoes = await prisma.locacao.findMany({
            where: { usuarioId: usuarioId },
            include: { veiculo: true },
            orderBy: { id: "desc" }
        });
        return locacoes;
    }

    async findById(id, usuarioId) {
        const locacao = await prisma.locacao.findUnique({
            where: { id: id },
            include: { veiculo: true }
        });
        if (!locacao) {
            throw new LocacaoNaoEncontradaError();
        }
        if (locacao.usuarioId !== usuarioId) {
            throw new AcessoNegadoError();
        }
        return locacao;
    }

    async finalizar(id, usuarioId) {
        const locacao = await this.findById(id, usuarioId);
        if (locacao.status === "FINALIZADA") {
            throw new LocacaoJaFinalizadaError();
        }

        const locacaoFinalizada = await prisma.$transaction(async (tx) => {
            const resultado = await tx.locacao.updateMany({
                where: { id: id, status: "ATIVA" },
                data: { status: "FINALIZADA", dataDevolucao: new Date() }
            });
            if (resultado.count === 0) {
                throw new LocacaoJaFinalizadaError();
            }

            await tx.veiculo.update({
                where: { id: locacao.veiculoId },
                data: { disponivel: true }
            });

            return tx.locacao.findUnique({
                where: { id: id },
                include: { veiculo: true }
            });
        });

        return locacaoFinalizada;
    }
}

module.exports = new LocacaoService();
