const express = require('express');
const app = express();
const fs = require('fs')
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

// Salvar a requisição em uma pasta local.

// request(url).pipe(fs.createWriteStream('boletos2.json')) // https://github.com/request/request


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
            res.json([ body.data.charges ])
        })
        app.post('/post', (req,res) => {
            res.json([ body.data.charges ])
        })
    }
});

app.listen(3000, () => {
    console.log('Sucess');
})