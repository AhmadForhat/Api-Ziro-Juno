const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const rp = require('request-promise-native');
require('dotenv').config()

router.post('/transferencia-saldo', async (req,res) => {
    const basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/fetch-balance';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?token=${process.env.TOKEN}&${query}`;

    let options = {
        method: 'POST',
        url:url,
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
module.exports = router