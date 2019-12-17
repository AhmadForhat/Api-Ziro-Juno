const express = require('express');
const app = express();
require('dotenv').config()

// Validação do token
const basicAuth = require('express-basic-auth')
const pdw = process.env.pdw;

app.use(basicAuth({
    users: {
        ahmad: pdw
    }
}))

// Consulta de pagamentos realizados

const consultaPag = require('./routes/consultaPag.js');

app.use(consultaPag);

// Geração de boletos!

const geracaoBoletos = require('./routes/geracaoBoletos.js');

app.use(geracaoBoletos);

// Consulta de Saldo a transferir

const consultaSaldo = require('./routes/consultaSaldo.js');

app.use(consultaSaldo);

// Solicitação de transferência

const transferencia = require('./routes/transferencia');

app.use(transferencia);

// Erro de requisição

const erro404 = require('./routes/badRequest.js');

app.use(erro404);

// Porta onde o servidor esta rodando

app.listen(process.env.PORT || 3000, () => console.log(`Escutando na porta ${process.env.PORT || 3000}`))