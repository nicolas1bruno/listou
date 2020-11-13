const jwt = require('jsonwebtoken')
const authConfig = require("../config/auth")

verifyToken = (req, res, next) => {

    const authHeaders = req.headers.authorization

    if(!authHeaders)
        return res.status(401).send({message: 'No token provided'})

    const parts = authHeaders.split(' ')

    if(!parts.length === 2)
        return res.status(401).send({message: 'Token Error'})

    const [scheme, token] = parts


    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({message: 'Token malfomatted'})

    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err)
            return res.status(401).send({message: 'Token invalido'})

        req.userId = decoded.id

        return next()
    })

};


const authJwt = {
  verifyToken
};
module.exports = authJwt;