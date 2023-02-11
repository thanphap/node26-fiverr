const { AppError } = require("../helpers/error");
const { JobDetail } = require("../models");
const { Op } = require('sequelize');

const getListJobDetail = async () => {
    try {
        const jobDetails = await JobDetail.findAll();
        return jobDetails;
    } catch (error) {
        throw error;
    }
};

const getJobDetail = async (jobDetailId) => {
    try {
        const jobDetail = await JobDetail.findByPk(jobDetailId);
        return jobDetail;
    } catch (error) {
        throw error;
    }
};

const createdJobDetail = async (data) => {
    try {
        const valid = await JobDetail.findOne({
            where: {
                jobDetailName: data.jobDetailName,
            }
        });
        if (valid) {
            throw new AppError(400, 'Job Detail is existed');
        }
        const createdJobDetail = await JobDetail.create(data);
        return createdJobDetail;
    } catch (error) {
        throw error;
    }
};

const updateJobDetail = async (jobDetailId, data) => {
    try {
        const jobDetail = await JobDetail.findByPk(jobDetailId);
        if (!jobDetail) {
            throw new AppError(400, 'Job Detail not found');
        }
        await JobDetail.update(data, { where: { jobDetailId: jobDetail.jobDetailId } });
        return await JobDetail.findByPk(jobDetail.jobDetailId);
    } catch (error) {
        throw error;
    }
};

const deleteJobDetail = async (jobDetailId) => {
    try {
        const jobDetail = await JobDetail.findByPk(jobDetailId);
        if (!jobDetail) {
            throw new AppError(400, 'Job Detail not found');
        }
        await JobDetail.destroy({ where: { jobDetailId: jobDetailId } });
        return 'Delete Job Detail success';
    } catch (error) {
        throw error;
    }
};

const pagingJobDetail = async (pageIndex, pageSize, keyword) => {
    try {
        const totalRow = await JobDetail.count();
        const pagingJobDetails = await JobDetail.findAll({
            where: {
                jobDetailName: { [Op.like]: '%' + (keyword == undefined ? '' : keyword) + '%' }
            },
            offset: (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize,
            limit: pageSize,
        });
        return {
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalRow: totalRow,
            keywords: keyword,
            data: pagingJobDetails
        };
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getListJobDetail,
    getJobDetail,
    createdJobDetail,
    updateJobDetail,
    deleteJobDetail,
    pagingJobDetail,
}



