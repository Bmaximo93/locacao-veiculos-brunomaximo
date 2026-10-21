const locacaoService = require("../services/LocacaoService");

class LocacaoController {

    async findMany(request, response) {
        const locacoes = await locacaoService.findMany(request.usuario.id);
        return response.status(200).json({ locacoes });
    }

    async findById(request, response) {
        const id = Number(request.params.id);
        const locacao = await locacaoService.findById(id, request.usuario.id);
        return response.status(200).json({ locacao });
    }

    async create(request, response) {
        const locacao = await locacaoService.create(request.usuario.id, request.body);
        return response.status(201).json({ locacao });
    }

    async finalizar(request, response) {
        const id = Number(request.params.id);
        const locacao = await locacaoService.finalizar(id, request.usuario.id);
        return response.status(200).json({ locacao });
    }
}

module.exports = new LocacaoController();
