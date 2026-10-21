import { formatarMoeda } from "../utils/formatar";

function VeiculoLista({ veiculos, onAlugar }) {
    if (veiculos.length === 0) {
        return <p className="vazio">Nenhum veículo encontrado.</p>;
    }

    return (
        <table className="tabela">
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Ano</th>
                    <th>Diária</th>
                    <th>Situação</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {veiculos.map((veiculo) => (
                    <tr key={veiculo.id}>
                        <td>{veiculo.marca}</td>
                        <td>{veiculo.modelo}</td>
                        <td>{veiculo.placa}</td>
                        <td>{veiculo.ano}</td>
                        <td>{formatarMoeda(veiculo.valorDiaria)}</td>
                        <td>
                            <span className={veiculo.disponivel ? "etiqueta etiqueta-verde" : "etiqueta etiqueta-vermelha"}>
                                {veiculo.disponivel ? "Disponível" : "Alugado"}
                            </span>
                        </td>
                        <td>
                            {veiculo.disponivel && (
                                <button type="button" onClick={() => onAlugar(veiculo)}>Alugar</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default VeiculoLista;
