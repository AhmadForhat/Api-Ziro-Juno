const querystring = require('querystring')
const rp = require('request-promise-native')
require('dotenv').config()

const geracaoToken =  async (req,res) => {
    const basicUrl = "https://sandbox.boletobancario.com/authorization-server/oauth/token"
    const query = querystring.stringify(req.query)
    const url = `${basicUrl}?${query}`
    const username = process.env.user2
    const password = process.env.pdw2
    const auth = "Basic " + new Buffer.from(username + ":" + password).toString("base64");
    let options = {
        method: 'POST',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": auth
        },
        url:url,
        json: true
    };

    try {
        let data = await rp(options)
        res.json({data})
    } catch (err) {
        res.json({err})
    }
}

module.exports = geracaoToken