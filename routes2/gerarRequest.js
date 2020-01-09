const rp = require('request-promise-native')

const gerarOptions = (query,auth,endPoint,method) => {
    const tokenJuno = process.env.TOKEN
    const basicUrl = `https://sandbox.boletobancario.com/api-integration/${endPoint}`
    const url = `${basicUrl}?${query}`
    let options = {
        method: method,
        url:url,
        headers :{
            "Authorization": auth,
            "X-API-Version": "2",
            "X-Resource-Token": tokenJuno
        },
        json: true
    }
        return rp(options)
}

module.exports = gerarOptions
