const querystring = require('querystring');
const rp = require('request-promise-native');
require('dotenv').config()

const geracaoBoletos = async (req,res) => {
    const basicUrl = 'https://sandbox.boletobancario.com/boletofacil/integration/api/v1/issue-charge';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?token=${process.env.TOKEN}&${query}`;

    let options = {
        method: 'POST',
        url:url,
        json:true
    };

    try{
        let data = await rp(options)
        res.json({data})
    }
    catch(err){
        res.json([ `Status Code: ${err.statusCode}`, `Descrição do erro: ${err.error.errorMessage}` ])
    }
    }

module.exports = geracaoBoletos