const querystring = require('querystring')
const gerarOptions = require('../utils/gerarOptions')

const listarCobrancas =  async (req,res) => {
    try {
        const auth = res.locals.accessToken
        const query = querystring.stringify(req.query)
        const data = await gerarOptions(query,auth,"charges","GET")
        res.json(data) 
    } catch (error) {
        if(error.error.details != ""){
            res.status(error.error.status).send({"Erro de requisição": error.error})
        }else{
            res.status(error.error.status).send(error)
        }
    }
}

module.exports = listarCobrancas