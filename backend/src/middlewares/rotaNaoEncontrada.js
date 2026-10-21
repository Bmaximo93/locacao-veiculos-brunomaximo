const rotaNaoEncontrada = (request, response) => {
    return response.status(404).json({ message: "Rota não encontrada." });
};

module.exports = rotaNaoEncontrada;
