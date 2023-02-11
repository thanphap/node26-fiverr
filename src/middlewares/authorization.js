const jwt = require('jsonwebtoken');
const config = require('../config');
const { AppError } = require('../helpers/error');
const { User } = require('../models');

const extracTokenFromHeader = (headers) => {
    const bearerToken = headers.authorization;
    if (!bearerToken) {
        throw new AppError(401, 'Invalid token');
    }
    const parts = bearerToken.split(" ");
    if (parts.length != 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
        throw new AppError(401, 'Invalid token');
    }
    return parts[1];
};

const authorization = async (req, res, next) => {
    try {
        const token = extracTokenFromHeader(req.headers);
        const payload = jwt.verify(token, config.SECRET_KEY);
        const user = await User.findByPk(payload.id);
        if (!user) {
            throw new AppError(401, 'Invalid token');
        }
        res.locals.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError(401, 'Invaild token'));
        }
        next(error);
    }
};

module.exports = authorization;