require("dotenv/config");
const bcrypt = require("bcryptjs");
const prisma = require("../src/databases/prisma");

const veiculos = [
    { marca: "Fiat", modelo: "Mobi", placa: "QWE1A23", ano: 2022, valorDiaria: 89.9 },
    { marca: "Volkswagen", modelo: "Gol", placa: "RTY4567", ano: 2021, valorDiaria: 99.9 },
    { marca: "Chevrolet", modelo: "Onix", placa: "UIO8B90", ano: 2023, valorDiaria: 119.9 },
    { marca: "Hyundai", modelo: "HB20", placa: "ASD2C34", ano: 2023, valorDiaria: 124.5 },
    { marca: "Toyota", modelo: "Corolla", placa: "FGH5678", ano: 2024, valorDiaria: 219 },
    { marca: "Jeep", modelo: "Compass", placa: "JKL9D12", ano: 2024, valorDiaria: 289.9 }
];

async function main() {
    const senha = await bcrypt.hash("123456", 10);

    await prisma.usuario.upsert({
        where: { email: "demo@locadora.com" },
        update: {},
        create: { nome: "Usuário Demo", email: "demo@locadora.com", senha: senha }
    });

    for (const veiculo of veiculos) {
        await prisma.veiculo.upsert({
            where: { placa: veiculo.placa },
            update: {},
            create: veiculo
        });
    }

    console.log("Dados de exemplo criados com sucesso.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
