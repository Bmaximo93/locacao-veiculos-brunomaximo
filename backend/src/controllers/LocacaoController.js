const locacaoService = require("../services/LocacaoService");

class LocacaoController {

    async create(request, response) {
        const locacao = await locacaoService.create(request.usuario.id, request.body);
        return response.status(201).json({ locacao });
    }
}

module.exports = new LocacaoController();
