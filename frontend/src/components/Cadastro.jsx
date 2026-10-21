import { useState } from "react";
import { cadastrarUsuario } from "../services/api";

function Cadastro({ onIrParaLogin, mostrarMensagem }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setCarregando(true);
        try {
            await cadastrarUsuario({ nome, email, senha });
            mostrarMensagem("sucesso", "Cadastro realizado! Faça login para continuar.");
            onIrParaLogin();
        } catch (error) {
            mostrarMensagem("erro", error.message);
        }
        setCarregando(false);
    }

    return (
        <div className="cartao cartao-auth">
            <h2>Criar conta</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </label>
                <label>
                    E-mail
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Senha
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} minLength={6} required />
                </label>
                <button type="submit" disabled={carregando}>
                    {carregando ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
            <p>
                Já tem conta?{" "}
                <button type="button" className="link" onClick={onIrParaLogin}>Entrar</button>
            </p>
        </div>
    );
}

export default Cadastro;
