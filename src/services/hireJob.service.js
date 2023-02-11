const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { HireJob, User, Job } = require("../models");

const getListHireJob = async () => {
    try {
        const hireJobs = await HireJob.findAll();
        return hireJobs;
    } catch (error) {
        throw error;
    }
};

const getHireJob = async (hireJobId) => {
    try {
        const hireJob = await HireJob.findByPk(hireJobId);
        return hireJob;
    } catch (error) {
        throw error;
    }
};

const createdHireJob = async (jobId, userId, data) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        const hasRenter = await job.hasRenter(user.userId);
        if (hasRenter) {
            throw new AppError(400, "Hire Job is existed");
        }
        else {
            const hireJob = await job.addRenter(user.userId, { through: { hireDate: data.hireDate } });
            return hireJob;
        }

    } catch (error) {
        throw error;
    }
};

const updateHireJob = async (jobId, userId, data) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        const hasRenter = await job.hasRenter(user.userId);
        if (!hasRenter) {
            throw new AppError(400, "Hire Job is not existed");
        }
        else {
            await job.setRenter(user.userId, { through: { hireDate: data.hireDate } });
            return await job.getRenter({attributes: []});
        }
    } catch (error) {
        throw error;
    }
};

const deleteHireJob = async (jobId, userId) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        console.log(job.__proto__);
        const hasRenter = await job.hasRenter(user.userId);
        if (!hasRenter) {
            throw new AppError(400, "Hire Job is not existed");
        }
        else {
            await job.removeRenter(user.userId);
            return "Delete Hire Job success";
        }
    } catch (error) {
        throw error;
    }
};

const pagingHireJob = async (pageIndex, pageSize, keyword) => {
    try {
        const totalRow = await HireJob.count();
        const pagingHireJobs = await HireJob.findAll({
            where: {
                hireJobId: { [Op.like]: '%' + (keyword == undefined ? '' : keyword) + '%' }
            },
            offset: (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize,
            limit: pageSize,
        });
        return {
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalRow: totalRow,
            keywords: keyword,
            data: pagingHireJobs
        }
    } catch (error) {
        throw error;
    }
};


const hiredJobList = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        return await user.getHireJob({attributes: ["jobName"]});
    } catch (error) {
        throw error;
    }
};

const finishHireJob = async (jobId, userId) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        const hasRenter = await job.hasRenter(user.userId);
        if (!hasRenter) {
            throw new AppError(400, "Hire Job is not existed");
        }
        else {
            await job.setRenter(user.userId, { through: { complete: true } });
            return await job.getRenter({attributes: []});
        }

    } catch (error) {
        throw error;
    }
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