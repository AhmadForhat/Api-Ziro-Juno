require('dotenv').config()
const tokenJuno = process.env.TOKEN

const basicUrl = (caminho,query) => `https://sandbox.boletobancario.com/boletofacil/integration/api/v1/${caminho}?token=${tokenJuno}&${query}`

module.exports = basicUrl