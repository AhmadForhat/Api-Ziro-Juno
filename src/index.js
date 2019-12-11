const express = require('express');
const app = express();
const querystring = require('querystring');
const request = require('request-promise-native');

// Testando querystring

app.get('/consulta-pagamentos', async (req,res) => {
    const basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?${query}`;
    // console.log(Object.keys(req));
    console.log(req.route.path)
    const resultado = await request({
        url:url,
        json: true // testar sem
    })
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

app.listen(3000, () => {
    console.log('Sucess');
})