const { response } = require('../helpers/response');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');

const register = () => { 
    return async (req, res, next) => { 
        try {
            let data = req.body;
            data = {...data, role: 'user'};
            const createdUser = await userService.createdUser(data);
            res.status(200).json(response(createdUser));
        } catch (error) {
            next(error);
        }
     }
 }

const login = () => {
    return async (req, res, next) => { 
        try {
            const credentials = req.body;
            const user = await authService.login(credentials);
            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        }
     }
}

module.exports = {
    login, 
    register,
}