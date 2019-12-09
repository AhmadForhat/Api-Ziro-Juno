const express = require('express');
const app = express();
const querystring = require('querystring');
const request = require('request');

// Testando querystring

let basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
const query = querystring.stringify(
    {   token: 'FF66FF607414B9F657DB2439BCF4D1E3F964BB323D62EF756B038352CA650189',
        beginDueDate: '07/12/2019',
        endDueDate: '08/12/2019',
        beginPaymentDate: '07/12/2019',
        endPaymentDate: '08/12/2019',
        beginPaymentConfirmation: '07/12/2019',
        endPaymentConfirmation: '08/12/2019'
     });
const url = basicUrl + '?' + query;

// Salvar a requisição em uma pasta local.

// request(url).pipe(fs.createWriteStream('boletos2.json')) // https://github.com/request/request

app.get('/consulta-pagamentos', (req,res) => {
    request({
        url:url,
        json: true
    },(e,r,body) => {
        if(e){
            if(e.code == 'ENOTFOUND')
                console.log(e);
                res.json({"Nome do erro": e.code,
                            "Descrição": "Url não encontrada"});
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
            console.log(JSON.stringify({ body }))
            res.json(ids);
    }})
})

app.listen(3000, () => {
    console.log('Sucess');
})