const jwt = require('jsonwebtoken');
const { secret } = require('./config');

function generateAccessToken(username) {
    return jwt.sign({
        username
    },
        secret,
        {
            expiresIn: '24h'
        });
}
module.exports = generateAccessToken