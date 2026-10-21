const bcrypt = require("bcryptjs");
const prisma = require("../databases/prisma");
const EmailEmUsoError = require("../errors/EmailEmUsoError");

const camposPublicos = {
    id: true,
    nome: true,
    email: true,
    createdAt: true
};

class UsuarioService {

    async create(dados) {
        const { nome, email, senha } = dados;

        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: email }
        });
        if (usuarioExistente) {
            throw new EmailEmUsoError();
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await prisma.usuario.create({
            data: { nome, email, senha: senhaHash },
            select: camposPublicos
        });
        return usuario;
    }

    async findById(id) {
        const usuario = await prisma.usuario.findUnique({
            where: { id: id },
            select: camposPublicos
        });
        return usuario;
    }
}

module.exports = new UsuarioService();
