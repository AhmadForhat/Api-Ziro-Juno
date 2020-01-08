const gerarOptions = require('./gerarRequest')

const pesquisaCharges =  async (req,res) => {
    const auth = res.locals.accessToken
    const query = " "
    const endPoint = `charges/${(req.query.id)}`
    const data = await gerarOptions(query,auth,endPoint,"GET")
    res.json(data)
}

module.exports = pesquisaCharges