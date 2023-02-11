const configs = require('../config');
const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const jobService = require('../services/job.service');
const jobTypeService = require('../services/jobType.service');

const getlistJob = () => {
    return async (req, res, next) => {
        try {
            const jobs = await jobService.getlistJob();
            res.status(200).json(response(jobs));
        } catch (error) {
            next(error);
        }
    };
};

const getJobTypeMenu = () => {
    return async (req, res, next) => {
        try {
            const menuJobType = await jobTypeService.getJobTypeMenu();
            res.status(200).json(response(menuJobType));
        } catch (error) {
            next(error);
        }
    }
}

const getJob = () => {
    return async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const job = await jobService.getJob(jobId);
            res.status(200).json(response(job));
        } catch (error) {
            next(error);
        }
    };
};

const getDetailJobType = () => {
    return async (req, res, next) => {
        try {
            const { jobTypeId } = req.params;
            const detailJobType = await jobTypeService.getDetailJobType(jobTypeId);
            res.status(200).json(response(detailJobType));
        } catch (error) {
            next(error);
        }
    };
};

const getDetailJob = () => {
    return async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const detailJob = await jobService.getDetailJob(jobId);
            res.status(200).json(response(detailJob));
        } catch (error) {
            next(error);
        }
    };
};

const searchNameJobs = () => {
    return async (req, res, next) => {
        try {
            const { jobName } = req.params;
            const jobs = await jobService.searchNameJobs(jobName);
            res.status(200).json(response(jobs));
        } catch (error) {
            next(error);
        }
    };
};

const getJobsByTypeDetail = () => {
    return async (req, res, next) => {
        try {
            const { jobDetailId } = req.params;
            const jobs = await jobService.getJobsByTypeDetail(jobDetailId);
            res.status(200).json(response(jobs));
        } catch (error) {
            next(error);
        }
    };
};

const createdJob = () => {
    return async (req, res, next) => {
        try {
            let job = req.body;
            const userId = res.locals.user.userId;
            job = { ...job, userId: userId }
            const createdJob = await jobService.createdJob(job);
            res.status(200).json(response(createdJob));
        } catch (error) {
            next(error);
        }
    };
};

const updateJob = () => {
    return async (req, res, next) => {
        try {
            const { jobId } = req.params;
            let job = req.body;
            const userId = res.locals.user.userId;
            job = { ...job, userId: userId }
            const updateJob = await jobService.updateJob(jobId, job);
            res.status(200).json(response(updateJob));
        } catch (error) {
            next(error);
        }
    };
};

const updateImageJob = () => {
    return async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const userId = res.locals.user.userId;
            const file = req.file;
            if (!file) {
                next(new AppError(400, 'Please upload a file'));
            }
            file.path = file.path.replace(/\\/g, "/");
            const url = `${req.protocol}://${req.hostname}:${configs.PORT}/${file.path}`;
            const job = {
                userId: userId,
                image: url
            };
            const updateJob = await jobService.updateJob(jobId, job);
            res.status(200).json(response(updateJob));
        } catch (error) {
            next(error);
        }
    };
};

const deleteJob = () => {
    return async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const userId = res.locals.user.userId;
            const deleteJob = await jobService.deleteJob(jobId, userId);
            res.status(200).json(response(deleteJob));
        } catch (error) {
            next(error)
        }
    };
};

const pagingJob = () => {
    return async (req, res, next) => {
        try {
            const { pageIndex, pageSize, keyword } = req.query;
            const pagingJob = await jobService.pagingJobs(Number(pageIndex), Number(pageSize), keyword);
            res.status(200).json(response(pagingJob));
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    getlistJob,
    getJobTypeMenu,
    getDetailJobType,
    getDetailJob,
    searchNameJobs,
    getJobsByTypeDetail,
    getJob,
    createdJob,
    updateJob,
    updateImageJob,
    deleteJob,
    pagingJob,
}