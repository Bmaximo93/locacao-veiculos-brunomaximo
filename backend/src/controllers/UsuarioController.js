const usuarioService = require("../services/UsuarioService");

class UsuarioController {

    async create(request, response) {
        const usuario = await usuarioService.create(request.body);
        return response.status(201).json({ usuario });
    }

    async login(request, response) {
        const { token, usuario } = await usuarioService.login(request.body);
        return response.status(200).json({ token, usuario });
    }
}

module.exports = new UsuarioController();
