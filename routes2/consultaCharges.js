const querystring = require('querystring')
const gerarOptions = require('./gerarRequest')

const consultaCharges =  async (req,res) => {
    const auth = res.locals.accessToken
    const query = querystring.stringify(req.query)
    const data = await gerarOptions(query,auth,"charges","GET")
    res.json(data)
}

module.exports = consultaCharges