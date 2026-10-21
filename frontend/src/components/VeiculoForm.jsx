import { useState } from "react";
import { cadastrarVeiculo } from "../services/api";

const veiculoVazio = {
    marca: "",
    modelo: "",
    placa: "",
    ano: "",
    valorDiaria: ""
};

function VeiculoForm({ onCadastrado, mostrarMensagem }) {
    const [veiculo, setVeiculo] = useState(veiculoVazio);

    function handleChange(event) {
        const { name, value } = event.target;
        setVeiculo({ ...veiculo, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await cadastrarVeiculo({
                ...veiculo,
                ano: Number(veiculo.ano),
                valorDiaria: Number(veiculo.valorDiaria)
            });
            mostrarMensagem("sucesso", "Veículo cadastrado com sucesso!");
            setVeiculo(veiculoVazio);
            onCadastrado();
        } catch (error) {
            mostrarMensagem("erro", error.message);
        }
    }

    return (
        <form className="cartao formulario-grade" onSubmit={handleSubmit}>
            <h3>Cadastrar veículo</h3>
            <label>
                Marca
                <input name="marca" value={veiculo.marca} onChange={handleChange} required />
            </label>
            <label>
                Modelo
                <input name="modelo" value={veiculo.modelo} onChange={handleChange} required />
            </label>
            <label>
                Placa
                <input name="placa" value={veiculo.placa} onChange={handleChange} placeholder="ABC1D23" required />
            </label>
            <label>
                Ano
                <input name="ano" type="number" value={veiculo.ano} onChange={handleChange} required />
            </label>
            <label>
                Valor da diária (R$)
                <input name="valorDiaria" type="number" step="0.01" min="0.01" value={veiculo.valorDiaria} onChange={handleChange} required />
            </label>
            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default VeiculoForm;
