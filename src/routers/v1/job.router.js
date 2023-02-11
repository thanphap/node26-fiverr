const express = require('express');
const { getlistJob, getJob, createdJob, updateJob, deleteJob, pagingJob, getJobTypeMenu, getDetailJobType, getDetailJob, searchNameJobs, getJobsByTypeDetail, updateImageJob } = require('../../controllers/job.controller');
const authorization = require('../../middlewares/authorization');
const { uploadFunc } = require('../../middlewares/upload');

const jobRouter = express.Router();

jobRouter.get('', getlistJob());
jobRouter.get('/detail/:jobId', getDetailJob());
jobRouter.get('/search/:jobName', searchNameJobs());
jobRouter.get('/jobtype/:jobTypeId', getDetailJobType());
jobRouter.get('/jobdetail/:jobDetailId', getJobsByTypeDetail());
jobRouter.get('/jobtype', getJobTypeMenu());
jobRouter.get('/paging', pagingJob());
jobRouter.get('/:jobId', getJob());
jobRouter.post('/uploadimage/:jobId', authorization, uploadFunc('imageJob'), updateImageJob());
jobRouter.post('', authorization, createdJob());
jobRouter.put('/:jobId', authorization, updateJob());
jobRouter.delete('/:jobId', authorization, deleteJob());

module.exports = jobRouter;