const express = require('express');
const { getListJobDetail, getJobDetail, pagingJobDetail, createdJobDetail, updateJobDetail, deleteJobDetail, updateImageDetailJob } = require('../../controllers/jobDetail.controller');
const { uploadFunc } = require('../../middlewares/upload');
const authorization = require('../../middlewares/authorization');

const jobDetailRouter = express.Router();

jobDetailRouter.get('', getListJobDetail());
jobDetailRouter.get('/paging', pagingJobDetail());
jobDetailRouter.get('/:jobDetailId', getJobDetail());
jobDetailRouter.post('/uploadimage/:jobDetailId', authorization, uploadFunc('imageDetailJob'), updateImageDetailJob());
jobDetailRouter.post('', authorization, createdJobDetail());
jobDetailRouter.put('/:jobDetailId', authorization, updateJobDetail());
jobDetailRouter.delete('/:jobDetailId', authorization, deleteJobDetail());

module.exports = jobDetailRouter;
