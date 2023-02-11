const configs = require('../config');
const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const userService = require('../services/user.service');

const getlistUser = () => {
    return async (req, res, next) => {
        try {
            const users = await userService.getListUser();
            res.status(200).json(response(users));
        } catch (error) {
            next(error);
        }
    };
};

const getUser = () => {
    return async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userService.getUser(userId)
            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        }
    };
};

const createdUser = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const createdUser = await userService.createdUser(data);
            res.status(200).json(response(createdUser));
        } catch (error) {
            next(error);
        }
    };
};

const updateUser = () => {
    return async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = req.body;
            const updateUser = await userService.updateUser(userId, user);
            res.status(200).json(response(updateUser));
        } catch (error) {
            next(error);
        }
    };
};

const updateAvatar = () => { 
    return async (req, res, next) => { 
        try {
            const { userId } = req.params;
            const file = req.file;
            if(!file){
                next (new AppError(400, 'Please upload a file'));
            }
            file.path = file.path.replace(/\\/g, "/");
            const url = `${req.protocol}://${req.hostname}:${configs.PORT}/${file.path}`;
            const data = { 
                avatar: url
            };
            const updateAvatar = await userService.updateAvatar( userId, data);
            res.status(200).json(response(updateAvatar));
        } catch (error) {
            next(error);
        }
     }
 }

const deleteUser = () => {
    return async (req, res, next) => {
        try {
            const { userId } = req.params;
            const deleteUser = await userService.deleteUser(userId);
            res.status(200).json(response(deleteUser));
        } catch (error) {
            next(error);
        }
    };
};

const searchUser = () => {
    return async (req, res, next) => {
        try {
            const { name } = req.params;
            const searchUser = await userService.searchUsers(name);
            res.status(200).json(response(searchUser));
        } catch (error) {
            next(error);
        }
    };
};

const pagingUser = () => {
    return async (req, res, next) => {
        try {
            const { pageIndex, pageSize, keyword } = req.query;
            const pagingUser = await userService.pagingUsers(Number(pageIndex), Number(pageSize), keyword);
            res.status(200).json(response(pagingUser));
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    getlistUser,
    getUser,
    createdUser,
    updateUser,
    updateAvatar,
    deleteUser,
    searchUser,
    pagingUser,
}