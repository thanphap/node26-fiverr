const { response } = require('../helpers/response');
const hireJobService = require('../services/hireJob.service');

const getListHireJob = () => { 
    return async (req, res, next) => { 
        try {
            const hireJobs = await hireJobService.getListHireJob();
            res.status(200).json(response(hireJobs))
        } catch (error) {
            next(error);
        }
     };
 };

const getHireJob = () => { 
    return async (req, res, next) => { 
        try {
            const { hireJobId } = req.params;
            const hireJob = await hireJobService.getHireJob(hireJobId);
            res.status(200).json(response(hireJob));
        } catch (error) {
            next(error);
        }
     };
 };

const createdHireJob = () => { 
    return async (req, res, next) => { 
        try {
            const data = req.body;
            const jobId = data.jobId;
            const userId = res.locals.user.userId;
            const hireJob = await hireJobService.createdHireJob(jobId, userId, data);
            res.status(200).json(response(hireJob));
        } catch (error) {
            next(error);
        }
     };
 };

const updateHireJob = () => { 
    return async (req, res, next) => { 
        try {
            const data = req.body;
            const jobId = data.jobId;
            const userId = res.locals.user.userId;
            const hireJob = await hireJobService.updateHireJob(jobId, userId, data);
            res.status(200).json(response(hireJob));
        } catch (error) {
            next(error);
        }
     };
 };

const deleteHireJob = () => { 
    return async (req, res, next) => { 
        try {
            const jobId = req.body.jobId;
            const userId = res.locals.user.userId;
            const hireJob = await hireJobService.deleteHireJob(jobId, userId);
            res.status(200).json(response(hireJob));
        } catch (error) {
            next(error);
        }
     };
 };

const pagingHireJob = () => { 
    return async (req, res, next) => { 
        try {
            const { pageIndex, pageSize, keyword} = req.query;
            const pagingHireJobs = await hireJobService.pagingHireJob(Number(pageIndex), Number(pageSize), keyword);
            res.status(200).json(response(pagingHireJobs));
        } catch (error) {
            next(error)
        }
     };
 };

const hiredJobList = () => { 
    return async (req, res, next) => { 
        try {
            const userId = res.locals.user.userId;
            const hiredJobs = await hireJobService.hiredJobList(userId);
            res.status(200).json(response(hiredJobs)); 
        } catch (error) {
            next(error);
        }
     };
 };

const finishHireJob = () => { 
    return async (req, res, next) => { 
        try {
            const { jobId } = req.body;
            const userId = res.locals.user.userId;
            const finishJob = await hireJobService.finishHireJob(jobId, userId);
            res.status(200).json(response(finishJob));
        } catch (error) {
            next(error);
        }
     };
 };

 module.exports = {
    getListHireJob,
    getHireJob,
    createdHireJob,
    updateHireJob,
    deleteHireJob,
    pagingHireJob,
    hiredJobList,
    finishHireJob,
 }