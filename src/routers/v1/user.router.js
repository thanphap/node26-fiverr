const express = require('express');
const { getlistUser, getUser, createdUser, updateUser, deleteUser, searchUser, pagingUser, updateAvatar } = require('../../controllers/user.controller');
const authorization = require('../../middlewares/authorization');
const requiredRole = require('../../middlewares/requiredRole');
const { uploadFunc } = require('../../middlewares/upload');

const userRouter = express.Router();

userRouter.get('', authorization, requiredRole('admin'), getlistUser());
userRouter.get('/search/:name', authorization, requiredRole('admin'), searchUser());
userRouter.get('/paging', authorization, requiredRole('admin'), pagingUser());
userRouter.get('/:userId', authorization, getUser());
userRouter.post('/uploadavatar/:userId', authorization, uploadFunc('avatar'), updateAvatar());
userRouter.post('', authorization, requiredRole('admin'), createdUser());
userRouter.put('/:userId', authorization, updateUser());
userRouter.delete('/:userId', authorization, requiredRole('admin'), deleteUser());

module.exports = userRouter;