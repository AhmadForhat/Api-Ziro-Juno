const querystring = require('querystring')
const rp = require('request-promise-native')
require('dotenv').config()

const tokenJuno = process.env.TOKEN
const acessToken = process.env.acessToken

const consultaCharges =  async (req,res) => {
    const basicUrl = "https://sandbox.boletobancario.com/api-integration/charges"
    const query = querystring.stringify(req.query)
    const url = `${basicUrl}?${query}`
    let options = {
        method: 'GET',
        url:url,
        headers :{
            "Authorization": acessToken,
            "X-API-Version": "2",
            "X-Resource-Token": tokenJuno
        },
        json: true
    };

    try {
        let data = await rp(options)
        res.json({data})
    } catch (err) {
        res.json({err})
    }
}

module.exports = consultaCharges
