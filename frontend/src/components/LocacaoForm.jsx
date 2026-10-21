import { useState } from "react";
import { registrarLocacao } from "../services/api";
import { formatarMoeda } from "../utils/formatar";

function LocacaoForm({ veiculos, veiculoInicial, onRegistrada, mostrarMensagem }) {
    const [veiculoId, setVeiculoId] = useState(veiculoInicial ? String(veiculoInicial.id) : "");
    const [dataInicio, setDataInicio] = useState("");
    const [dataPrevistaDevolucao, setDataPrevistaDevolucao] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (new Date(dataPrevistaDevolucao) <= new Date(dataInicio)) {
            mostrarMensagem("erro", "A data prevista de devolução deve ser posterior à data de início.");
            return;
        }

        try {
            const dados = await registrarLocacao({
                veiculoId: Number(veiculoId),
                dataInicio: new Date(dataInicio).toISOString(),
                dataPrevistaDevolucao: new Date(dataPrevistaDevolucao).toISOString()
            });
            mostrarMensagem("sucesso", `Locação registrada! Valor total: ${formatarMoeda(dados.locacao.valorTotal)}`);
            setVeiculoId("");
            setDataInicio("");
            setDataPrevistaDevolucao("");
            onRegistrada();
        } catch (error) {
            mostrarMensagem("erro", error.message);
        }
    }

    return (
        <form className="cartao formulario-grade" onSubmit={handleSubmit}>
            <h3>Nova locação</h3>
            <label>
                Veículo
                <select value={veiculoId} onChange={(e) => setVeiculoId(e.target.value)} required>
                    <option value="">Selecione um veículo disponível</option>
                    {veiculos.map((veiculo) => (
                        <option key={veiculo.id} value={veiculo.id}>
                            {veiculo.marca} {veiculo.modelo} - {veiculo.placa} ({formatarMoeda(veiculo.valorDiaria)}/dia)
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Data de início
                <input type="datetime-local" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
            </label>
            <label>
                Devolução prevista
                <input type="datetime-local" value={dataPrevistaDevolucao} onChange={(e) => setDataPrevistaDevolucao(e.target.value)} required />
            </label>
            <button type="submit">Registrar locação</button>
        </form>
    );
}

export default LocacaoForm;
