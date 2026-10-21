import { useEffect, useState } from "react";
import VeiculoForm from "./VeiculoForm";
import VeiculoLista from "./VeiculoLista";
import { listarVeiculos } from "../services/api";

function Veiculos({ onAlugar, mostrarMensagem }) {
    const [veiculos, setVeiculos] = useState([]);
    const [filtro, setFiltro] = useState("todos");

    async function carregarVeiculos() {
        try {
            const dados = await listarVeiculos(filtro);
            setVeiculos(dados.veiculos);
        } catch (error) {
            mostrarMensagem("erro", error.message);
        }
    }

    useEffect(() => {
        carregarVeiculos();
    }, [filtro]);

    return (
        <section>
            <VeiculoForm onCadastrado={carregarVeiculos} mostrarMensagem={mostrarMensagem} />

            <div className="cartao">
                <div className="titulo-com-filtro">
                    <h3>Veículos</h3>
                    <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                        <option value="todos">Todos</option>
                        <option value="true">Disponíveis</option>
                        <option value="false">Alugados</option>
                    </select>
                </div>
                <VeiculoLista veiculos={veiculos} onAlugar={onAlugar} />
            </div>
        </section>
    );
}

export default Veiculos;
