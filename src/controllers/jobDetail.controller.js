const configs = require('../config');
const { response } = require('../helpers/response');
const { AppError } = require('../helpers/error');
const jobDetailService = require('../services/jobDetail.service');

const getListJobDetail = () => { 
    return async (req, res, next) => { 
        try {
            const jobDetails = await jobDetailService.getListJobDetail();
            res.status(200).json(response(jobDetails));
        } catch (error) {
            next(error);
        }
     };
 };

const getJobDetail = () => { 
    return async (req, res, next) => { 
        try {
            const { jobDetailId } = req.params;
            const jobDetail = await jobDetailService.getJobDetail(jobDetailId);
            res.status(200).json(response(jobDetail));
        } catch (error) {
            next(error);
        }
     };
 };

const createdJobDetail = () => { 
    return async (req, res, next) => { 
        try {
            const data = req.body;
            const jobDetail = await jobDetailService.createdJobDetail(data);
            res.status(200).json(response(jobDetail));
        } catch (error) {
            next(error);
        }
     };
 };

const updateJobDetail = () => { 
    return async (req, res, next) => { 
        try {
            const data = req.body;
            const { jobDetailId } = req.params;
            const jobDetail = await jobDetailService.updateJobDetail(jobDetailId, data);
            res.status(200).json(response(jobDetail));
        } catch (error) {
            next(error);
        }
     };
 };

const updateImageDetailJob = () => { 
    return async (req, res, next) => { 
        try {
            const { jobDetailId } = req.params;
            const file = req.file;
            if(!file){
                next (new AppError(400, 'Please upload a file'));
            }
            file.path = file.path.replace(/\\/g, "/");
            const url = `${req.protocol}://${req.hostname}:${configs.PORT}/${file.path}`;
            const data = { 
                image: url
            };
            const jobDetail = await jobDetailService.updateJobDetail(jobDetailId, data);
            res.status(200).json(response(jobDetail));
        } catch (error) {
            next(error);
        }
     }
 }

const deleteJobDetail = () => { 
    return async (req, res, next) => { 
        try {
            const { jobDetailId } = req.params;
            const jobDetail = await jobDetailService.deleteJobDetail(jobDetailId);
            res.status(200).json(response(jobDetail));
        } catch (error) {
            next(error);
        }
     };
 };

const pagingJobDetail = () => { 
    return async (req, res, next) => { 
        try {
            const { pageIndex, pageSize, keyword } = req.query;
            const pagingJobDetails = await jobDetailService.pagingJobDetail(Number(pageIndex), Number(pageSize), keyword);
            res.status(200).json(response(pagingJobDetails));
        } catch (error) {
            next(error);
        }
     };
 };

module.exports = {
    getListJobDetail,
    getJobDetail,
    createdJobDetail,
    updateJobDetail,
    updateImageDetailJob,
    deleteJobDetail,
    pagingJobDetail,
};