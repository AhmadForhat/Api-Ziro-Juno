const basicAuth = (req,res,next) => {
    if(req.headers.authorization == process.env.basicAuth){
        next()
    }else{
        res.status(401).send("Unidentified Basic Authentication!")
    }
}

module.exports = basicAuth