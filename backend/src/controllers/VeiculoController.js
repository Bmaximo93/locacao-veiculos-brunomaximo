const veiculoService = require("../services/VeiculoService");

class VeiculoController {

    async findMany(request, response) {
        const { disponivel } = request.query;

        let filtroDisponivel;
        if (disponivel === "true") {
            filtroDisponivel = true;
        }
        if (disponivel === "false") {
            filtroDisponivel = false;
        }

        const veiculos = await veiculoService.findMany(filtroDisponivel);
        return response.status(200).json({ veiculos });
    }

    async findById(request, response) {
        const id = Number(request.params.id);
        const veiculo = await veiculoService.findById(id);
        return response.status(200).json({ veiculo });
    }

    async create(request, response) {
        const veiculo = await veiculoService.create(request.body);
        return response.status(201).json({ veiculo });
    }
}

module.exports = new VeiculoController();
