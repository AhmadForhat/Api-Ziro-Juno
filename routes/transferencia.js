const querystring = require('querystring');
const rp = require('request-promise-native');
const gerarUrl = require('./basicUrl.js')
require('dotenv').config()
const nossoToken = process.env.NOSSOTOKEN

const transferenciaSaldo = async (req,res) => {
    const basicUrl = gerarUrl('fetch-balance')
    const query = querystring.stringify(req.query)
    const url = `${basicUrl}&${query}`

    let options = {
        method: 'POST',
        url:url,
        json:true
    };

    try{
        if(req.headers.token == nossoToken){
            let data = await rp(options)
            res.json({ data })
            }else{
                res.send("SEU TOKEN É INVÁLIDO")
            }
    }
    catch(err){
        res.json([ `Status Code: ${err.statusCode}`, `Descrição do erro: ${err.error.errorMessage}` ])
    }
}
module.exports = transferenciaSaldo