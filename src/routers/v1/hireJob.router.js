
const express = require('express');
const { getListHireJob, pagingHireJob, getHireJob, createdHireJob, hiredJobList, updateHireJob, deleteHireJob, finishHireJob } = require('../../controllers/hireJob.controller');
const authorization = require('../../middlewares/authorization')

const hireJobRouter = express.Router();

hireJobRouter.get('', getListHireJob());
hireJobRouter.get('/paging', pagingHireJob());
hireJobRouter.get('/hired', authorization, hiredJobList());
hireJobRouter.get('/:hireJobId', getHireJob());
hireJobRouter.post('/finish', authorization, finishHireJob());
hireJobRouter.post('', authorization, createdHireJob());
hireJobRouter.put('', authorization, updateHireJob());
hireJobRouter.delete('', authorization, deleteHireJob());

module.exports = hireJobRouter;

