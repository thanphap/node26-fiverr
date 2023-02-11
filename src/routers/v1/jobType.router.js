const express = require('express');
const { getListJobType, getJobType, createdJobType, updateJobType, deleteJobType, pagingJobType } = require('../../controllers/jobType.controller');
const authorization = require('../../middlewares/authorization');

const jobTypeRouter = express.Router();

jobTypeRouter.get('', getListJobType());
jobTypeRouter.get('/paging', pagingJobType());
jobTypeRouter.get('/:jobTypeId', getJobType());
jobTypeRouter.post('', authorization, createdJobType());
jobTypeRouter.put('/:jobTypeId', authorization, updateJobType());
jobTypeRouter.delete('/:jobTypeId', authorization, deleteJobType());

module.exports = jobTypeRouter;




