const { AppError } = require("../helpers/error");
const { JobType } = require("../models");
const { Op } = require('sequelize');

const getListJobType = async () => {
    try {
        const jobTypes = await JobType.findAll();
        return jobTypes;
    } catch (error) {
        throw error;
    }
};

const getJobTypeMenu = async () => {
    try {
        const jobTypes = await JobType.findAll({
            include: [{
                association: 'jobDetails',
            }]
        });
        return jobTypes;
    } catch (error) {
        throw error;
    }
}

const getJobType = async (jobTypeId) => {
    try {
        const jobType = await JobType.findByPk(jobTypeId);
        return jobType;
    } catch (error) {
        throw error;
    }
};

const getDetailJobType = async (jobTypeId) => {
    try {
        const jobType = await JobType.findByPk(jobTypeId, {
            include: [{
                association: 'jobDetails',
            }]
        });
        return jobType;
    } catch (error) {
        throw error;
    }
};

const createdJobType = async (data) => {
    try {
        const valid = await JobType.findOne({
            where: {
                jobTypeName: data.jobTypeName,
            }
        });
        if (valid) {
            throw new AppError(400, 'Job type is existed')
        }
        const createdJobType = await JobType.create(data);
        return createdJobType;
    } catch (error) {
        throw error;
    }
};

const updateJobType = async (jobId, data) => {
    try {
        const jobType = await JobType.findByPk(jobId);
        if (!jobType) {
            throw new AppError(400, 'Job Type not found');
        }
        await JobType.update(data, { where: { jobTypeId: jobType.jobTypeId } });
        return await JobType.findByPk(jobType.jobTypeId);
    } catch (error) {
        throw error;
    }
};

const deleteJobType = async (jobTypeId) => {
    try {
        const jobType = await JobType.findByPk(jobTypeId);
        if (!jobType) {
            throw new AppError(400, 'Job Type not found');
        }
        await JobType.destroy({ where: { jobTypeId: jobType.jobTypeId } });
        return 'Delete Job Type success';
    } catch (error) {
        throw error
    }
};

const pagingJobType = async (pageIndex, pageSize, keyword) => {
    try {
        const totalRow = await JobType.count();
        const pagingJobTypes = await JobType.findAll({
            where: {
                jobTypeName: { [Op.like]: '%' + (keyword == undefined ? '' : keyword) + '%' }
            },
            offset: (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize,
            limit: pageSize,
        });
        return {
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalRow: totalRow,
            keywords: keyword,
            data: pagingJobTypes
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getListJobType,
    getJobTypeMenu,
    getJobType,
    getDetailJobType,
    createdJobType,
    updateJobType,
    deleteJobType,
    pagingJobType,
}

