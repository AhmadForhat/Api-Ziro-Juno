const express = require('express');
const app = express();
const querystring = require('querystring');
const request = require('request-promise-native');

// Testando querystring

app.get('/consulta-pagamentos', async (req,res) => {
    const result = await request("https://viacep.com.br/ws/01001000/json/");
    console.log(result);
    const basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?${query}`;
    console.log(url);
    // console.log(Object.keys(req));
    // console.log('headers', req.headers);
    // console.log('url', req.url);
    // console.log('baseUrl', req.baseUrl);
    // console.log('query', req.query);
    // // console.log('res', req.res);
    // console.log('params', req.params);
    // console.log('originalUrl', req.originalUrl);
    // console.log('route', req.route);
    request({
        url:url,
        json: true // testar sem
    })
    .then((body) => {
        // console.log(e)
        // console.log(r)
        // console.log(body)
        // if(e){
        //     if(e.code == 'ENOTFOUND')
        //         console.log(e);
        //         res.json({"Nome do erro": e.code,
        //                     "Descrição": "Url não encontrada"});
        //     if(e.code != 'ENOTFOUND'){
        //         console.log(e);
        //         res.json(e.code)
        //     }
        // }else{
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
            console.log(JSON.stringify({ body }))
            res.json([ ids, date ]);
    })
    .catch((error) => {
        console.log(error)
        // res.json(`Código do erro: ${error.cause.code}`)
    })
})

app.listen(3000, () => {
    console.log('Sucess');
})