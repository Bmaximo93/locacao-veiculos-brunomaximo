function Cabecalho({ usuario, onSair }) {
    return (
        <header className="cabecalho">
            <h1>Locadora de Veículos</h1>
            {usuario && (
                <div className="usuario-logado">
                    <span>Olá, <strong>{usuario.nome}</strong></span>
                    <button type="button" onClick={onSair}>Sair</button>
                </div>
            )}
        </header>
    );
}

export default Cabecalho;
