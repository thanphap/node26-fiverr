const jwt = require('jsonwebtoken');
const config = require('../config');
const EXPIRES_IN = 60 * 60 * 24;

const generateToken = (payload) => { 
    const token = jwt.sign(
        {
            id: payload.userId,
            email: payload.email,
        },
        config.SECRET_KEY,
        {
            expiresIn: EXPIRES_IN,
        }
    );
    return {
        token,
        expiresIn: EXPIRES_IN,
    };
 };

 module.exports = {
    generateToken,
 };

 