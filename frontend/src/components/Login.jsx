import { useState } from "react";
import { login } from "../services/api";

function Login({ onLogin, onIrParaCadastro, mostrarMensagem }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setCarregando(true);
        try {
            const dados = await login({ email, senha });
            localStorage.setItem("token", dados.token);
            onLogin(dados.usuario);
            mostrarMensagem("sucesso", `Bem-vindo, ${dados.usuario.nome}!`);
        } catch (error) {
            mostrarMensagem("erro", error.message);
        }
        setCarregando(false);
    }

    return (
        <div className="cartao cartao-auth">
            <h2>Entrar</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    E-mail
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Senha
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </label>
                <button type="submit" disabled={carregando}>
                    {carregando ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p>
                Não tem conta?{" "}
                <button type="button" className="link" onClick={onIrParaCadastro}>Cadastre-se</button>
            </p>
        </div>
    );
}

export default Login;
