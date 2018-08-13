'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'key_secret';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene los Headers necesarios'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.ext <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch(e){
        return res.status(404).send({message: 'Token no valido'});
    }
    req.user = payload;
    next();
}
