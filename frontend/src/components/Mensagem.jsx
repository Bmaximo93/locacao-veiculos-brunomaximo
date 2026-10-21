function Mensagem({ mensagem, onFechar }) {
    if (!mensagem) {
        return null;
    }

    return (
        <div className={`mensagem mensagem-${mensagem.tipo}`}>
            <span>{mensagem.texto}</span>
            <button type="button" onClick={onFechar}>x</button>
        </div>
    );
}

export default Mensagem;
