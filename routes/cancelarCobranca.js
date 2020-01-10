const gerarOptions = require('../utils/gerarOptions')

const cancelarCobranca =  async (req,res) => {
    try {
        const auth = res.locals.accessToken
        const query = " "
        const endPoint = `charges/${(req.query.id)}/cancelation`
        const data = await gerarOptions(query,auth,endPoint,"PUT")
        res.json(data)
    } catch (error) {
        if(error.error.details != ""){
            res.status(error.error.status).send({"Erro de requisição": error.error})
        }else{
            res.status(error.error.status).send(error)
        }
    }
}

module.exports = cancelarCobranca