require('dotenv').config()
const tokenJuno = process.env.TOKEN

const basicUrl = (caminho) => {
    const basicUrl = `https://sandbox.boletobancario.com/boletofacil/integration/api/v1/${caminho}?token=${tokenJuno}`
    return basicUrl
} 

module.exports = basicUrl