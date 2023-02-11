const { AppError } = require("../helpers/error");
const { Job, User } = require("../models");
const { Op } = require('sequelize');

const getlistJob = async () => {
    try {
        const jobs = await Job.findAll();
        return jobs;
    } catch (error) {
        throw error;
    }
};

const getJob = async (jobId) => {
    try {
        const job = await Job.findByPk(jobId);
        return job;
    } catch (error) {
        throw error;
    }
};

const createdJob = async (data) => {
    try {
        const createdJob = await Job.create(data);
        return createdJob;
    } catch (error) {
        throw error;
    }
};


const updateJob = async (jobId, data) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(data.userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        if(user.userId !== job.userId){
            throw new AppError(403, "No have permission");
        }
        await Job.update(data, { where: { jobId: job.jobId } });
        return await Job.findByPk(job.jobId);
    } catch (error) {
        throw error;
    }
};

const deleteJob = async (jobId, userId) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        if(user.userId !== job.userId){
            throw new AppError(403, "No have permission");
        }
        await Job.destroy({ where: { jobId: job.jobId } });
        return 'Delete job success';
    } catch (error) {
        throw error;
    }
};

const pagingJobs = async (pageIndex, pageSize, keyword) => {
    try {
        const totalRow = await Job.count();
        const pagingJobs = await Job.findAll({
            where: {
                jobName: { [Op.like]: '%' + (keyword == undefined ? '' : keyword) + '%' }
            },
            offset: (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize,
            limit: pageSize,
        });
        return {
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalRow: totalRow,
            keywords: keyword,
            data: pagingJobs
        };
    } catch (error) {
        throw error;
    }
};

const searchNameJobs = async (name) => {
    try {
        const searchNameJobs = await Job.findAll({
            where: {
                jobName: { [Op.like]: '%' + name + '%' }
            },
            include: [
                {
                    association: 'userCreated',
                    attributes: ['name', 'avatar'],
                },
                {
                    association: 'jobDetail',
                    attributes: {
                        exclude: ['jobTypeId', 'jobDetailId']
                    },
                    include: {
                        association: 'jobType'
                    }
                },
            ]
        });
        return searchNameJobs;
    } catch (error) {
        throw error;
    }
};

const getJobsByTypeDetail = async (jobDetailId) => {
    try {
        const jobs = await Job.findAll({
            where: {
                jobDetailId: jobDetailId,
            },
            include: [
                {
                    association: 'userCreated',
                    attributes: ['name', 'avatar'],
                },
                {
                    association: 'jobDetail',
                    attributes: {
                        exclude: ['jobType', 'jobDetailId'],
                    },
                    include: {
                        association: 'jobType',
                    }
                }
            ],
        })
        return jobs;
    } catch (error) {
        throw error;
    }
};

const getDetailJob = async (jobId) => {
    try {
        const job = await Job.findByPk(jobId, {
            include: [
                {
                    association: 'userCreated',
                    attributes: ['name', 'avatar'],
                },
                {
                    association: 'jobDetail',
                    attributes: {
                        exclude: ['jobTypeId', 'jobDetailId']
                    },
                    include: {
                        association: 'jobType'
                    }
                },
            ]
        });
        return job;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getlistJob,
    getJob,
    createdJob,
    updateJob,
    deleteJob,
    pagingJobs,
    searchNameJobs,
    getDetailJob,
    getJobsByTypeDetail,
}
