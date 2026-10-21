const jwt = require("jsonwebtoken");
const usuarioService = require("../services/UsuarioService");
const NaoAutenticadoError = require("../errors/NaoAutenticadoError");

const autenticar = async (request, response, next) => {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new NaoAutenticadoError("Token não informado.");
    }

    const token = authorization.split(" ")[1];

    let dados;
    try {
        dados = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        throw new NaoAutenticadoError("Token inválido ou expirado.");
    }

    const usuario = await usuarioService.findById(dados.id);
    if (!usuario) {
        throw new NaoAutenticadoError("Usuário do token não existe mais.");
    }

    request.usuario = usuario;
    next();
};

module.exports = autenticar;
