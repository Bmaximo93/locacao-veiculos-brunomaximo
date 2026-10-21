import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho";
import Mensagem from "./components/Mensagem";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Veiculos from "./components/Veiculos";
import { buscarPerfil } from "./services/api";

function App() {
    const [usuario, setUsuario] = useState(null);
    const [telaAuth, setTelaAuth] = useState("login");
    const [mensagem, setMensagem] = useState(null);
    const [aba, setAba] = useState("veiculos");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            buscarPerfil()
                .then((dados) => setUsuario(dados.usuario))
                .catch(() => localStorage.removeItem("token"));
        }
    }, []);

    function mostrarMensagem(tipo, texto) {
        setMensagem({ tipo, texto });
    }

    function sair() {
        localStorage.removeItem("token");
        setUsuario(null);
        setTelaAuth("login");
        setAba("veiculos");
        mostrarMensagem("sucesso", "Você saiu do sistema.");
    }

    return (
        <>
            <Cabecalho usuario={usuario} onSair={sair} />
            <main className="conteudo">
                <Mensagem mensagem={mensagem} onFechar={() => setMensagem(null)} />

                {!usuario && telaAuth === "login" && (
                    <Login
                        onLogin={setUsuario}
                        onIrParaCadastro={() => setTelaAuth("cadastro")}
                        mostrarMensagem={mostrarMensagem}
                    />
                )}

                {!usuario && telaAuth === "cadastro" && (
                    <Cadastro
                        onIrParaLogin={() => setTelaAuth("login")}
                        mostrarMensagem={mostrarMensagem}
                    />
                )}

                {usuario && (
                    <nav className="abas">
                        <button
                            type="button"
                            className={aba === "veiculos" ? "aba-ativa" : ""}
                            onClick={() => setAba("veiculos")}
                        >
                            Veículos
                        </button>
                    </nav>
                )}

                {usuario && aba === "veiculos" && (
                    <Veiculos onAlugar={() => {}} mostrarMensagem={mostrarMensagem} />
                )}
            </main>
        </>
    );
}

export default App;
