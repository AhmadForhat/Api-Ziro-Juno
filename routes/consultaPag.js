const querystring = require('querystring')
const rp = require('request-promise-native')
const gerarUrl = require('./basicUrl.js')
require('dotenv').config()
const nossoToken = process.env.NOSSOTOKEN

const consultaPag =  async (req,res) => {
    const url = gerarUrl('list-charges', querystring.stringify(req.query))
    let options = {
        method: 'GET',
        url:url,
        json: true
    };

    try {
        if(req.headers.token == nossoToken){
            let data = await rp(options)
            res.json({data})
        }else{
            res.send("SEU TOKEN É INVÁLIDO")
        }

    } catch (err) {
        if(error.statusCode == 400){
            res.json([error.error.errorMessage])
        }
        else{
            res.json({error})
        }
    }
}

module.exports = consultaPag