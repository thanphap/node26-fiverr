const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const jobRouter = require('./job.router');
const jobTypeRouter = require('./jobType.router');
const jobDetailRouter = require('./jobDetail.router');
const commentRouter = require('./comment.router');
const hireJobRouter = require('./hireJob.router');
const v1 = express.Router();

v1.use('/auth', authRouter);
v1.use('/user', userRouter);
v1.use('/job', jobRouter);
v1.use('/jobtype', jobTypeRouter);
v1.use('/jobdetail', jobDetailRouter);
v1.use('/comment', commentRouter);
v1.use('/hirejob', hireJobRouter);

module.exports = v1;