const jobTypeService = require('../services/jobType.service');
const { response } = require('../helpers/response');

const getListJobType = () => {
    return async (req, res, next) => {
        try {
            const jobTypes = await jobTypeService.getListJobType();
            res.status(200).json(response(jobTypes));
        } catch (error) {
            next(error);
        }
    };
};

const getJobType = () => {
    return async (req, res, next) => {
        try {
            const { jobTypeId } = req.params;
            const jobType = await jobTypeService.getJobType(jobTypeId);
            res.status(200).json(response(jobType));
        } catch (error) {
            next(error);
        }
    };
};

const createdJobType = () => {
    return async (req, res, next) => {
        try {
            const jobType = req.body;
            const createdJobType = await jobTypeService.createdJobType(jobType);
            res.status(200).json(response(createdJobType));
        } catch (error) {
            next(error);
        }
    };
};

const updateJobType = () => {
    return async (req, res, next) => {
        try {
            const { jobTypeId } = req.params;
            const jobType = req.body;
            const updateJobType = await jobTypeService.updateJobType(jobTypeId, jobType);
            res.status(200).json(response(updateJobType));
        } catch (error) {
            next(error);
        }
    };
};

const deleteJobType = () => {
    return async (req, res, next) => {
        try {
            const { jobTypeId } = req.params;
            const deleteJobType = await jobTypeService.deleteJobType(jobTypeId);
            res.status(200).json(response(deleteJobType));
        } catch (error) {
            next(error);
        }
    };
};

const pagingJobType = () => {
    return async (req, res, next) => {
        try {
            const { pageIndex, pageSize, keyword } = req.query;
            const pagingJobTypes = await jobTypeService.pagingJobType(Number(pageIndex), Number(pageSize), keyword);
            res.status(200).json(response(pagingJobTypes));
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    getListJobType,
    getJobType,
    createdJobType,
    updateJobType,
    deleteJobType,
    pagingJobType,
};

