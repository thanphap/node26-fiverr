const { AppError } = require("../helpers/error");

const requiredRole = (...roles) => {
    return (req, res, next) => {
        const { user } = res.locals;
        const isMatched = roles.includes(user.role);
        if (!isMatched) {
            next(new AppError(403, "No have permission"));
            return;
        }
        next();
    };
};

module.exports = requiredRole;