# Sistema de Locação de Veículos

Sistema web full stack para uma locadora de veículos, desenvolvido na disciplina **Programação com Frameworks Web**. Permite cadastrar usuários, fazer login, cadastrar e consultar veículos, registrar locações e devoluções e acompanhar o histórico de locações.

## Integrantes

| Nome | GitHub |
| --- | --- |
| Bruno Máximo | |
| | |
| | |
| | |

## Tecnologias

**Backend:** Node.js, Express 5, JavaScript, Prisma ORM 7, MySQL/MariaDB, JWT (`jsonwebtoken`), `bcryptjs`, Zod e CORS.

**Frontend:** React 19, Vite e Fetch API.

## Funcionalidades

- Cadastro de usuários com senha criptografada (bcrypt).
- Login com retorno de token JWT e identificação do usuário logado.
- Logout no frontend.
- Cadastro de veículos com placa única e valor da diária positivo.
- Listagem de veículos com filtro de disponibilidade (todos, disponíveis, alugados).
- Seleção de um veículo disponível para alugar.
- Registro de locação com cálculo do valor total no backend.
- Histórico de locações do usuário autenticado (ativas e finalizadas).
- Finalização (devolução) da locação, liberando o veículo novamente.

## Regras de negócio implementadas

- Apenas usuários autenticados acessam as rotas de veículos e locações.
- Um veículo não pode ter duas locações ativas ao mesmo tempo; ao ser alugado fica indisponível.
- A devolução encerra a locação e torna o veículo disponível de novo.
- Não é possível finalizar uma locação já finalizada.
- A data prevista de devolução precisa ser posterior à data de início.
- O valor total é `quantidade de diárias x valor da diária`, e qualquer fração de 24 horas conta como uma diária completa.
- O usuário só consulta e finaliza as próprias locações; o id do usuário vem do token JWT e não do corpo da requisição.
- Placas e e-mails não podem ser duplicados.
- Não é possível alugar um veículo inexistente.
- Veículos e locações não são excluídos, preservando o histórico.
- A criação e a finalização de locações usam transação (`prisma.$transaction`) com atualização condicional, evitando que duas requisições simultâneas aluguem o mesmo veículo.

## Estrutura do projeto

```
locacao-veiculos/
├── backend/
│   ├── prisma/
│   │   ├── migrations/        migrations versionadas do banco
│   │   ├── schema.prisma      modelos Usuario, Veiculo e Locacao
│   │   └── seed.js            dados de exemplo
│   ├── src/
│   │   ├── controllers/       recebem a requisição e devolvem a resposta HTTP
│   │   ├── databases/         conexão do Prisma com o MySQL
│   │   ├── errors/            classes de erro com status HTTP
│   │   ├── middlewares/       autenticação, validação e tratamento de erros
│   │   ├── routes/            mapeamento dos endpoints
│   │   ├── schemas/           validação dos dados de entrada com Zod
│   │   ├── services/          regras de negócio e acesso ao banco
│   │   ├── app.js             configuração do Express
│   │   └── index.js           inicialização do servidor
│   ├── requisicoes.http       exemplos de requisições da API
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/        componentes React das telas
    │   ├── services/api.js    funções que chamam a API com fetch
    │   ├── utils/formatar.js  formatação de moeda e datas
    │   ├── App.jsx            componente principal e controle de telas
    │   └── main.jsx
    └── .env.example
```

## Modelo de dados

- **Usuario**: `id`, `nome`, `email` (único), `senha` (hash), `createdAt`.
- **Veiculo**: `id`, `marca`, `modelo`, `placa` (única), `ano`, `valorDiaria`, `disponivel`.
- **Locacao**: `id`, `usuarioId` (FK), `veiculoId` (FK), `dataInicio`, `dataPrevistaDevolucao`, `dataDevolucao` (opcional), `valorTotal`, `status` (`ATIVA` ou `FINALIZADA`).

Relacionamentos: um `Usuario` possui várias `Locacao` (1:N) e um `Veiculo` possui várias `Locacao` em momentos diferentes (1:N).

## Requisitos para execução

- Node.js 20.19 ou superior
- npm
- MySQL 8 ou MariaDB rodando localmente

## Instalação e configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/Bmaximo93/locacao-veiculos-brunomaximo.git
cd locacao-veiculos-brunomaximo
```

### 2. Criar o banco de dados

No MySQL, crie o banco e um usuário com permissão sobre ele:

```sql
CREATE DATABASE locacao_veiculos;
CREATE USER 'locacao'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON *.* TO 'locacao'@'localhost';
FLUSH PRIVILEGES;
```

> O `prisma migrate dev` cria um banco temporário (shadow database), por isso o usuário precisa de permissão para criar bancos.

### 3. Configurar o backend

```bash
cd backend
cp .env.example .env
```

Preencha o `.env`:

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | URL de conexão usada pelo Prisma CLI (`mysql://usuario:senha@localhost:3306/locacao_veiculos`) |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Dados de conexão usados pelo adapter do Prisma na aplicação |
| `JWT_SECRET` | Chave secreta usada para assinar os tokens |
| `JWT_EXPIRES_IN` | Tempo de expiração do token (ex.: `1d`) |
| `PORT` | Porta da API (padrão `3000`) |

Instale as dependências, aplique as migrations e crie os dados de exemplo:

```bash
npm install
npx prisma migrate dev
npx prisma db seed
```

### 4. Configurar o frontend

```bash
cd ../frontend
cp .env.example .env
npm install
```

O `.env` do frontend contém `VITE_API_URL`, o endereço da API (padrão `http://localhost:3000`).

## Como executar

Em um terminal, inicie o backend:

```bash
cd backend
npm run dev
```

Em outro terminal, inicie o frontend:

```bash
cd frontend
npm run dev
```

Acesse `http://localhost:5173`.

### Usuário de exemplo

O seed cria um usuário para demonstração e seis veículos:

- E-mail: `demo@locadora.com`
- Senha: `123456`

## Rotas da API

Rotas marcadas com 🔒 exigem o cabeçalho `Authorization: Bearer <token>`.

| Método | Rota | Descrição | Sucesso |
| --- | --- | --- | --- |
| POST | `/usuarios` | Cadastra um usuário | 201 |
| POST | `/usuarios/login` | Faz login e retorna o token JWT | 200 |
| GET | `/usuarios/perfil` 🔒 | Dados do usuário autenticado | 200 |
| GET | `/veiculos` 🔒 | Lista veículos (`?disponivel=true` ou `false` para filtrar) | 200 |
| GET | `/veiculos/:id` 🔒 | Busca um veículo | 200 |
| POST | `/veiculos` 🔒 | Cadastra um veículo | 201 |
| GET | `/locacoes` 🔒 | Lista as locações do usuário autenticado | 200 |
| GET | `/locacoes/:id` 🔒 | Busca uma locação do usuário autenticado | 200 |
| POST | `/locacoes` 🔒 | Registra uma locação | 201 |
| PATCH | `/locacoes/:id/finalizar` 🔒 | Finaliza a locação (devolução) | 200 |

### Códigos de erro

| Código | Quando acontece |
| --- | --- |
| 400 | Dados inválidos, id inválido, JSON malformado ou data de devolução anterior ao início |
| 401 | Token ausente, inválido ou expirado; e-mail ou senha incorretos |
| 403 | Usuário tentando acessar ou finalizar locação de outro usuário |
| 404 | Veículo, locação ou rota não encontrados |
| 409 | E-mail ou placa já cadastrados, veículo indisponível ou locação já finalizada |
| 500 | Erro interno inesperado |

O arquivo [`backend/requisicoes.http`](backend/requisicoes.http) contém exemplos de todas as rotas e pode ser executado com a extensão **REST Client** do VS Code (ou reproduzido no Postman/Insomnia).

### Exemplo: registrar locação

```http
POST /locacoes
Authorization: Bearer <token>
Content-Type: application/json

{
    "veiculoId": 1,
    "dataInicio": "2026-11-10T10:00:00",
    "dataPrevistaDevolucao": "2026-11-12T12:00:00"
}
```

São 2 dias e 2 horas, ou seja, 3 diárias. Com diária de R$ 89,90 o valor total é R$ 269,70.

## Decisões de implementação

- **Routes, Controllers e Services separados:** as rotas só ligam o endpoint aos middlewares e ao controller; o controller lê a requisição e monta a resposta; o service concentra validações de negócio e o acesso ao banco via Prisma.
- **Tratamento de erros centralizado:** os services lançam erros que herdam de `ApiError` (com `statusCode`). O Express 5 encaminha automaticamente erros de funções `async` para o middleware `tratarErros`, que monta a resposta.
- **Validação com Zod:** o middleware `validarCorpo` valida o corpo das requisições antes de chegar ao controller e retorna 400 com a lista de erros.
- **Senha nunca exposta:** as consultas de usuário usam `select` apenas com os campos públicos.
- **`bcryptjs`:** implementação do bcrypt em JavaScript puro, sem necessidade de compilar dependências nativas.
- **Concorrência:** dentro de `prisma.$transaction`, o veículo é marcado como indisponível com `updateMany` filtrando por `disponivel: true`. Se outra requisição já tiver alugado o veículo, nenhuma linha é alterada (`count === 0`), a transação é desfeita e a API retorna 409. A finalização usa a mesma ideia filtrando por `status: "ATIVA"`.
- **Valores monetários:** `valorDiaria` e `valorTotal` usam `Decimal(10, 2)` no banco para evitar erros de arredondamento.
