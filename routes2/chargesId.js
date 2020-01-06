const querystring = require('querystring')
const rp = require('request-promise-native')
require('dotenv').config()

const pesquisaCharges =  async (req,res) => {
    require('dotenv').config()
    const UrlToken = "http://localhost:3000/geracao-token?grant_type=client_credentials"
    const tokenJuno = process.env.TOKEN
    const usernameToken = process.env.userToken
    const passwordToken = process.env.pdwToken
    const authToken = "Basic " + new Buffer.from(usernameToken + ":" + passwordToken).toString("base64");
    const optionsToken = {
        method: 'GET',
        url:UrlToken,
        headers :{
            "Authorization": authToken
        },
        json: true
    }
    let dataToken = await rp(optionsToken)
    const acessToken = `Bearer ${dataToken.data.access_token}`
    console.log(acessToken)
    // Busca por boleto
    const basicUrl = "https://sandbox.boletobancario.com/api-integration/charges"
    const query = (req.query.id)
    const url = `${basicUrl}/${query}`
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

module.exports = pesquisaCharges