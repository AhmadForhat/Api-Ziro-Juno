// Requisição dos pacotes utilizados no projeto

const express = require('express');
const app = express();
const querystring = require('querystring');
const request = require('request');

// Utilizando as datas sempre de hoje e ontem para criar um código dinâmico

let hoje = new Date();
let ontem = new Date(new Date ().setDate(new Date().getDate()-1));
let dataHoje = `${hoje.getDate()}/${hoje.getMonth()+1}/${hoje.getFullYear()}`;
let dataOntem = `${ontem.getDate()}/${ontem.getMonth()+1}/${ontem.getFullYear()}`;

// Criarção da URL utilizando querystring

    let basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
const query = querystring.stringify(
    {   token: 'FF66FF607414B9F657DB2439BCF4D1E3F964BB323D62EF756B038352CA650189',
        beginDueDate: dataOntem,
        endDueDate: dataHoje,
        beginPaymentDate: dataOntem,
        endPaymentDate: dataHoje,
        beginPaymentConfirmation: dataOntem,
        endPaymentConfirmation: dataHoje
     });
const url = basicUrl + '?' + query;

// Função de Requisição da URL com request (promise)

function requisicao(){
    return new Promise(function resolvePromise(resolve,reject){
        request({
            url:url,
            json: true
        },(e,r,body) => {
            if(e){
                    if(e.code == 'ENOTFOUND'){
                        console.log(e);
                        res.json({"Nome do erro": e.code,
                        "Descrição": "Url não encontrada"})};
                    if(e.code != 'ENOTFOUND'){
                        console.log(e);
                     res.json(e.code)
                }
            }else{
                const ids = [];
                for(let i in body.data.charges){
                const id = body.data.charges[i];
                ids.push(id.code)
            }
                const date = [];
                for(let i in body.data.charges){
                const id = body.data.charges[i];
                date.push(id.dueDate)
            }
                return resolve({ ids, date });
            }
        })
    })
}

// Função de GET do express utilizando a URL /consulta-pagamentos

function getApi(body){
        return app.get('/consulta-pagamentos', (req,res) => {
            res.json(body)
        })
}

// Função main onde coloca todas as função de promesa na ordem e da maneira async ou sync que quiser

main()
async function main(){
    try{
        console.time('medida-promise')
        const resultado = await requisicao()
        const puxaApi = await getApi(resultado)
        console.log(resultado)
    }
    catch(error){
        console.log('Deu error' , error)
    }
    console.timeEnd('medida-promise')
}

// Porta onde o servidor esta sendo executado

app.listen(3000, () => {
    console.log('Sucess');
})