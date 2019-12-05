# Api-Ziro-Juno

## Introdução
>A utilização do aplicativo da Juno tem como intuito facilitar emissões e combranças de boletos, tendo menos problemas burocráticos e maior retorno financeiro devido ao maior controle e organização proporcionado pela plataforma, a geração dos boletos por esta plataforma também possibilita uma maneira mais fácil de implementar datas de validades e juros automáticos, o que ajuda com o pagamento mais rápido pelos clientes e também trás uma questão de atendimento e cobrança mais rápida para qualquer eventual problema. Porém a utilização da plataforma da Juno não nós trás automatização para as tarefas diárias, devido a este problema, começou-se a ter a necessidade de utilizar APIs Rest para automatizar e facilitar o trabalho de geração de boletos, cobraças e controle de pagamentos.

## Objetivo
>Esse projeto tem como objetivo inicial a criação de uma API Rest que seja capaz de automatizar a geração de relatórios para a planilha do google sheets onde o financeiro da empresa controla as transações de cobranças e faz seu devido gerenciamento.

## Primeiros Passos
> Primeiramente foi definido que o projeto seria feito em node.js e publicado em um servidor que atualizaria automaticamente utilizando [cronjob](https://www.npmjs.com/package/cron), também foi definido que utilizariamos [express](https://expressjs.com/en/5x/api.html) e [request](https://www.npmjs.com/package/request) para fazer as HTTP do servidor.

## API Juno

```
// Requisição dos modulos
const express = require('express');
const app = express();
const request = require('request');

// Teste pra ficar mais "organizado"
let basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
const token = '?token=FF66FF607414B9F657DB2439BCF4D1E3F964BB323D62EF756B038352CA650189';
const beginDueDate = '&beginDueDate=03/12/2019'
const endDueDate = '&endDueDate=05/12/2019';
const beginPaymentDate = '&beginPaymentDate=03/12/2019';
const endPaymentDate = '&endPaymentDate=05/12/2019';
const beginPaymentConfirmation = '&beginPaymentConfirmation=03/12/2019';
const endPaymentConfirmation = '&endPaymentConfirmation=05/12/2019';
const query = token+beginDueDate+endDueDate+beginPaymentDate+endPaymentDate+beginPaymentConfirmation+endPaymentConfirmation;
let url = basicUrl + query;

// Requisição da API

const apiJuno = request({
    url: url,
    json: true
},(err, res, body) =>{
    if(err){
        console.log(err);
        return err
    }else{
        console.log(JSON.stringify({ body }, undefined, 1));
        app.get('/', (req,res) => {
            res.json({ body })
        })
    }
});

// Localhost de visualização.

app.listen(3000, () => {
    console.log('Sucess')
})
```
