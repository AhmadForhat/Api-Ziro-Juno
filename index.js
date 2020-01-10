const express = require('express')
const app = express()
const basicAuth = require('./middlewares/basicAuth')
const gerarToken = require('./middlewares/gerarToken')
const listaCobrancas = require('./routes2/listaCobrancas')
const verCobranca = require('./routes2/verCobranca')
const cancelarCobranca = require('./routes2/cancelarCobranca')
const error404 = require('./middlewares/error404')
require('dotenv').config()

app.use(basicAuth)
.use(gerarToken)
.use('/lista-cobrancas', listaCobrancas)
.use('/ver-cobranca', verCobranca)
.use('/cancelar-cobranca', cancelarCobranca)
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