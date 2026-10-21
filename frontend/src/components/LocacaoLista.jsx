import { formatarData, formatarMoeda } from "../utils/formatar";

function LocacaoLista({ locacoes, onFinalizar }) {
    if (locacoes.length === 0) {
        return <p className="vazio">Você ainda não possui locações.</p>;
    }

    return (
        <table className="tabela">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Veículo</th>
                    <th>Início</th>
                    <th>Devolução prevista</th>
                    <th>Devolvido em</th>
                    <th>Valor total</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {locacoes.map((locacao) => (
                    <tr key={locacao.id}>
                        <td>{locacao.id}</td>
                        <td>{locacao.veiculo.marca} {locacao.veiculo.modelo} ({locacao.veiculo.placa})</td>
                        <td>{formatarData(locacao.dataInicio)}</td>
                        <td>{formatarData(locacao.dataPrevistaDevolucao)}</td>
                        <td>{formatarData(locacao.dataDevolucao)}</td>
                        <td>{formatarMoeda(locacao.valorTotal)}</td>
                        <td>
                            <span className={locacao.status === "ATIVA" ? "etiqueta etiqueta-azul" : "etiqueta etiqueta-cinza"}>
                                {locacao.status === "ATIVA" ? "Ativa" : "Finalizada"}
                            </span>
                        </td>
                        <td>
                            {locacao.status === "ATIVA" && (
                                <button type="button" onClick={() => onFinalizar(locacao.id)}>Finalizar</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LocacaoLista;
