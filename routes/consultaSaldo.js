const gerarOptions = require('../utils/gerarOptions')

const consultaSaldo =  async (req,res) => {
    try {
        const auth = res.locals.accessToken
        const query = " "
        const endPoint = "balance"
        const data = await gerarOptions(query,auth,endPoint,"GET")
        res.json(data)
    } catch (error) {
        res.send(error)
    }
}

module.exports = consultaSaldo