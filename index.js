const express = require('express');
const app = express();
const querystring = require('querystring');
const rp = require('request-promise-native');

// Consulta de pagamentos realizados

app.get('/', (req,res) => {
    res.send("Bem vindo!")
})

app.get('/consulta-pagamentos', async (req,res) => {
    const basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?${query}`;
    // console.log(Object.keys(req));
    console.log(req.route.path)
    let options = {
        url:url,
        json: true
    }

    rp(options)
    .then((body) => {
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
        if(error.statusCode == 400){
            res.json([error.error.errorMessage])
        // }else if(error.error == ""){
        //     res.json(`Erro na solicitação, rever o que quer buscar`)
        }
        else{
            // res.json([`${error.cause.code} URL base com problema, favor solicitar alteração no código`])
            res.json({error})
        }
    })
})

// Geração de boletos!

app.post('/geracao-boleto', async (req,res) => {
    const basicUrl2 = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/issue-charge';
    const query2 = querystring.stringify(req.query);
    const url2 = `${basicUrl2}?${query2}`;

    let options = {
        method: 'POST',
        url:url2,
        json:true
    };

    try{
        let data = await rp(options)
        res.json({data})
    }
    catch(err){
        res.json({err})
    }
    })

// Consulta de Saldo a transferir

app.get('/consulta-saldo', async (req,res) => {
    const basicUrl3 = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/fetch-balance';
    const query3 = querystring.stringify(req.query);
    const url3 = `${basicUrl3}?${query3}`;

    let options = {
        method: 'GET',
        url:url3,
        json:true
    };
    try{
        let data = await rp(options)
        res.json({ data })
    }
    catch(err){
        res.json({ err })
    }
})

// Solicitação de transferência

app.post('/transferencia-saldo', async (req,res) => {
    const basicUrl4 = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/fetch-balance';
    const query4 = querystring.stringify(req.query);
    const url4 = `${basicUrl4}?${query4}`;

    let options = {
        method: 'POST',
        url:url4,
        json:true
    };
    try{
        let data = await rp(options)
        res.json({ data })
    }
    catch(err){
        res.json({ err })
    }
})

app.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`))