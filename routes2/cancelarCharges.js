const querystring = require('querystring')
const rp = require('request-promise-native')
require('dotenv').config()

const tokenJuno = process.env.TOKEN
const acessToken = process.env.acessToken

const cancelCharges =  async (req,res) => {
    const basicUrl = "https://sandbox.boletobancario.com/api-integration/charges"
    const query = (req.query.id)
    const url = `${basicUrl}/${query}/cancelation`
    let options = {
        method: 'PUT',
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
        res.send(`Cobrança de ID ${query} cancelada com sucesso`)
    } catch (err) {
        res.json({err})
    }
}

module.exports = cancelCharges
