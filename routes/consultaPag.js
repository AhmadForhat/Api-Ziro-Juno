const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const rp = require('request-promise-native');
require('dotenv').config()

router.get('/consulta-pagamentos', async (req,res) => {
    const basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/list-charges';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?token=${process.env.TOKEN}&${query}`;

    let options = {
        url:url,
        json: true
    };
    try {

        let data = await rp(options);
        const ids = [];
        for(let i in data.data.charges){
        const id = data.data.charges[i];
        ids.push(id.code)
        }
        const date = [];
        for(let i in data.data.charges){
        const id = data.data.charges[i];
        date.push(id.dueDate)
        }
        res.json([ ids, date ]);

    } catch (err) {
        if(error.statusCode == 400){
            res.json([error.error.errorMessage])
        }
        else{
            res.json({error})
        }
    }
})

module.exports = router