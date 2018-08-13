'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'key_secret';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix 
    }
    return jwt.encode(payload, secret);
}
