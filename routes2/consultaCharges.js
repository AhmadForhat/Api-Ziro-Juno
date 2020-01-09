const querystring = require('querystring')
const gerarOptions = require('./gerarRequest')

const consultaCharges =  async (req,res) => {
    try {
        const auth = res.locals.accessToken
        const query = querystring.stringify(req.query)
        const data = await gerarOptions(query,auth,"charges","GET")
        res.json(data) 
    } catch (error) {
        if(error.error.details != ""){
            res.json(error.error)
        }else{
            res.json(error)
        }
    }
}

module.exports = consultaCharges