const gerarOptions = require('./gerarRequest')

const cancelCharges =  async (req,res) => {
    try {
        const auth = res.locals.accessToken
        const query = " "
        const endPoint = `charges/${(req.query.id)}/cancelation`
        const data = await gerarOptions(query,auth,endPoint,"PUT")
        res.json(data)
    } catch (error) {
        if(error.error.details != ""){
            res.json(error.error)
        }else{
            res.json(error)
        }
    }
}

module.exports = cancelCharges