const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function montarMensagemDeErro(dados) {
    if (dados.erros) {
        return dados.erros.map((erro) => erro.message).join(" ");
    }
    return dados.message || "Erro inesperado.";
}

async function requisicao(caminho, metodo = "GET", corpo = null) {
    const opcoes = {
        method: metodo,
        headers: { "Content-Type": "application/json" }
    };

    const token = localStorage.getItem("token");
    if (token) {
        opcoes.headers.Authorization = `Bearer ${token}`;
    }

    if (corpo) {
        opcoes.body = JSON.stringify(corpo);
    }

    const resposta = await fetch(API_URL + caminho, opcoes);
    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(montarMensagemDeErro(dados));
    }
    return dados;
}

export function cadastrarUsuario(usuario) {
    return requisicao("/usuarios", "POST", usuario);
}

export function login(credenciais) {
    return requisicao("/usuarios/login", "POST", credenciais);
}

export function buscarPerfil() {
    return requisicao("/usuarios/perfil");
}

export function listarVeiculos(filtro) {
    if (filtro === "todos") {
        return requisicao("/veiculos");
    }
    return requisicao(`/veiculos?disponivel=${filtro}`);
}

export function cadastrarVeiculo(veiculo) {
    return requisicao("/veiculos", "POST", veiculo);
}

export function listarLocacoes() {
    return requisicao("/locacoes");
}

export function registrarLocacao(locacao) {
    return requisicao("/locacoes", "POST", locacao);
}

export function finalizarLocacao(id) {
    return requisicao(`/locacoes/${id}/finalizar`, "PATCH");
}
