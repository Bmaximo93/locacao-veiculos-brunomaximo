const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../databases/prisma");
const EmailEmUsoError = require("../errors/EmailEmUsoError");
const CredenciaisInvalidasError = require("../errors/CredenciaisInvalidasError");

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

    async login(dados) {
        const { email, senha } = dados;

        const usuario = await prisma.usuario.findUnique({
            where: { email: email }
        });
        if (!usuario) {
            throw new CredenciaisInvalidasError();
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            throw new CredenciaisInvalidasError();
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        };
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
