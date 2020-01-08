const express = require('express')
const app = express();
require('dotenv').config()

// Validação do token
const basicAuth = require('express-basic-auth')
const pdw = process.env.pdw;

if(pdw == undefined){
    app.use('*',(req,res) =>{
        res.send('Senha não definida!')
    })
}else{
app.use(basicAuth({
    users: { ahmad: pdw },
    unauthorizedResponse: 'Erro na autenticação do usuário'
}))}

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

const geracaoToken = require('./routes2/geracaoToken');
const consultaCobrancas = require('./routes2/consultaCharges')
const pesquisaCharges = require('./routes2/chargesId')
const cancelCharges = require('./routes2/cancelarCharges')

app.use(geracaoToken)
.use('/consulta-cobrancas', consultaCobrancas)
.use('/pesquisa-cobrancas', pesquisaCharges)
.use('/cancelar-cobrancas', cancelCharges)

// Erro 404 de status indefinido da página

app.use(erro404)

// Porta onde o servidor esta rodando

app.listen(process.env.PORT || 3000, () => console.log(`Escutando na porta ${process.env.PORT || 3000}`))