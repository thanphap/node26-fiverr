const { User } = require("../models");
const { AppError } = require('../helpers/error');
const { Op } = require("sequelize");

const getListUser = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw error;
    }
};

const getUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

const createdUser = async (data) => {
    try {
        const valid = await User.findOne({
            where: {
                email: data.email,
            }
        });
        if (valid) {
            throw new AppError(400, 'Email is existed');
        }
        if (!data.password) {
            throw new AppError(400, 'Please enter a password');
        }
        const createdUser = await User.create(data);
        return createdUser;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (userId, data) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        const email = await User.findOne({
            where: {
                userId: { [Op.ne]: user.userId },
                email: data.email,
            },
        });
        if (email) {
            throw new AppError(400, 'Email is existed');
        }
        await User.update(data, { where: { userId: user.userId } });
        return await User.findByPk(user.userId);
    } catch (error) {
        throw error;
    }
};

const updateAvatar = async (userId, data) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        await User.update(data, { where: { userId: user.userId } });
        return await User.findByPk(user.userId);
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        await User.destroy({ where: { userId: userId } });
        return 'Delete user success';
    } catch (error) {
        throw error;
    }
}

const searchUsers = async (name) => {
    try {
        const searchUsers = await User.findAll({
            where: {
                name: { [Op.like]: '%' + name + '%' }
            }
        });
        return searchUsers;
    } catch (error) {
        throw error;
    }
}

const pagingUsers = async (pageIndex, pageSize, keyword) => {
    try {
        const totalRow = await User.count();
        const pagingUsers = await User.findAll({
            where: {
                name: { [Op.like]: '%' + (keyword == undefined ? '' : keyword) + '%' }
            },
            offset: (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize,
            limit: pageSize,
        });
        return {
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalRow: totalRow,
            keywords: keyword,
            data: pagingUsers
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getListUser,
    getUser,
    createdUser,
    updateUser,
    updateAvatar,
    deleteUser,
    searchUsers,
    pagingUsers,
}