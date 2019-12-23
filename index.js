const express = require('express')
const app = express();
require('dotenv').config()

// Validação do token
const basicAuth = require('express-basic-auth')
const pdw = process.env.pdw;

app.use(basicAuth({
    // colocar o if aqui
    users: { ahmad: pdw },
    unauthorizedResponse: 'Erro na autenticação do usuário'
}))

// End Points da API Juno 1.0

const consultaPag = require('./routes/consultaPag.js')
const geracaoBoletos = require('./routes/geracaoBoletos.js')
const consultaSaldo = require('./routes/consultaSaldo.js')
const transferencia = require('./routes/transferencia')
const erro404 = require('./routes/badRequest.js')

app.use('/geracao-boleto', geracaoBoletos) /* Geração de boleto de cobranças */
.use('/consulta-pagamentos', consultaPag) /* Consulta dos pagementos efetuados */
.use('/consulta-saldo', consultaSaldo) /* Consulta do saldo referente aos pagamentos efetuados na juno */
.use('/transferencia-saldo', transferencia) /* Transferência do saldo referente aos pagamentos efetuados na juno */

// End Points da Api Juno 2.0

const geracaoToken = require('./routes/geracaoToken');

app.use('/geracao-token', geracaoToken)

// Erro 404 de status indefinido da página

app.use(erro404)

// Porta onde o servidor esta rodando

app.listen(process.env.PORT || 3000, () => console.log(`Escutando na porta ${process.env.PORT || 3000}`))