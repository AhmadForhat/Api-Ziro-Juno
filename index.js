const express = require('express')
const app = express()
const basicAuth = require('./middlewares/basicAuth')
const gerarToken = require('./middlewares/gerarToken')
const listarCobrancas = require('./routes/listarCobrancas')
const verCobranca = require('./routes/verCobranca')
const cancelarCobranca = require('./routes/cancelarCobranca')
const consultaSaldo = require('./routes/consultaSaldo')
const error404 = require('./middlewares/error404')
require('dotenv').config()

app.use(basicAuth)
.use(gerarToken)
.use('/listar-cobrancas', listarCobrancas)
.use('/ver-cobranca', verCobranca)
.use('/cancelar-cobranca', cancelarCobranca)
.use('/consulta-saldo', consultaSaldo)
.use(error404)
.listen(process.env.PORT || 3000, () => console.log(`Escutando na porta ${process.env.PORT || 3000}`))

// // End Points da API Juno 1.0

// const consultaPag = require('./routes/consultaPag.js')
// const geracaoBoletos = require('./routes/geracaoBoletos.js')
// const consultaSaldo = require('./routes/consultaSaldo.js')
// const transferencia = require('./routes/transferencia')

// app.use('/geracao-boleto', geracaoBoletos) /* Geração de boleto de cobranças */
// .use('/consulta-pagamentos', consultaPag) /* Consulta dos pagementos efetuados */
// .use('/consulta-saldo', consultaSaldo) /* Consulta do saldo referente aos pagamentos efetuados na juno */
// .use('/transferencia-saldo', transferencia) /* Transferência do saldo referente aos pagamentos efetuados na juno */