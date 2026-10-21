import { useEffect, useState } from "react";
import LocacaoForm from "./LocacaoForm";
import LocacaoLista from "./LocacaoLista";
import { finalizarLocacao, listarLocacoes, listarVeiculos } from "../services/api";
import { formatarMoeda } from "../utils/formatar";

function Locacoes({ veiculoEscolhido, mostrarMensagem }) {
    const [locacoes, setLocacoes] = useState([]);
    const [veiculosDisponiveis, setVeiculosDisponiveis] = useState([]);
    const [carregado, setCarregado] = useState(false);

    async function carregarDados() {
        try {
            const dadosLocacoes = await listarLocacoes();
            const dadosVeiculos = await listarVeiculos("true");
            setLocacoes(dadosLocacoes.locacoes);
            setVeiculosDisponiveis(dadosVeiculos.veiculos);
        } catch (error) {
            mostrarMensagem("erro", error.message);
        }
        setCarregado(true);
    }

    useEffect(() => {
        carregarDados();
    }, []);

    async function handleFinalizar(id) {
        if (!confirm("Confirmar a devolução deste veículo?")) {
            return;
        }
        try {
            const dados = await finalizarLocacao(id);
            mostrarMensagem("sucesso", `Locação finalizada! Valor total: ${formatarMoeda(dados.locacao.valorTotal)}`);
            carregarDados();
        } catch (error) {
            mostrarMensagem("erro", error.message);
        }
    }

    if (!carregado) {
        return <p>Carregando...</p>;
    }

    return (
        <section>
            <LocacaoForm
                veiculos={veiculosDisponiveis}
                veiculoInicial={veiculoEscolhido}
                onRegistrada={carregarDados}
                mostrarMensagem={mostrarMensagem}
            />

            <div className="cartao">
                <h3>Minhas locações</h3>
                <LocacaoLista locacoes={locacoes} onFinalizar={handleFinalizar} />
            </div>
        </section>
    );
}

export default Locacoes;
