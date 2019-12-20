const querystring = require('querystring');
const rp = require('request-promise-native');
require('dotenv').config()

const geracaoToken =  async (req,res) => {
    const basicUrl = 'https://sandbox.boletobancario.com/api-integration/oauth/token';
    const query = querystring.stringify(req.query);
    const url = `${basicUrl}?token=${process.env.TOKEN}&${query}`;

    let options = {
        method: 'POST',
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