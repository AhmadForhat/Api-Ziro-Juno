const gerarOptions = require('./gerarRequest')

const cancelCharges =  async (req,res) => {
    const auth = res.locals.accessToken
    const query = " "
    const endPoint = `charges/${(req.query.id)}/cancelation`
    const data = await gerarOptions(query,auth,endPoint,"PUT")
    res.json(data)
}

module.exports = cancelCharges