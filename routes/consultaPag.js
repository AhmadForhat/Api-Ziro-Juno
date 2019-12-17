const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const rp = require('request-promise-native');
require('dotenv').config()

router.get('/consulta-pagamentos', async (req,res) => {
    const basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?token=${process.env.TOKEN}&${query}`;
    console.log(url)
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

module.exports = router