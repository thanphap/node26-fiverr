const { AppError } = require("../helpers/error");
const { Comments, Job, User } = require("../models");

const getListComment = async () => {
    try {
        const comments = await Comments.findAll();
        return comments;
    } catch (error) {
        throw error;
    }
};

const getComment = async (commentId) => {
    try {
        const comment = await Comments.findByPk(commentId);
        return comment;
    } catch (error) {
        throw error;
    }
};

const getJobComment = async (jobId) => {
    try {
        const comments = await Job.findAll({
            where: { jobId: jobId },
            attributes: ["jobName"],
            include: [{
                association: "userComments",
                attributes: ["name", "avatar"],
                through: {
                    attributes: ["createdComment", "content", "commentRate"],
                }
            }]
        });
        return comments;
    } catch (error) {
        throw error;
    }
};

const createdComment = async (jobId, userId, data) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        // console.log(job.__proto__);
        const hasComment = await job.hasUserComment(user.userId);
        if (hasComment) {
            throw new AppError(400, "Comment is existed");
        }
        else {
            await job.addUserComment(user.userId, { through: { content: data.content, commentRate: data.commentRate } })
            return await job.getUserComments({ attributes: ["name", "avatar"] });
        }
    } catch (error) {
        throw error;
    }
}

const updateComment = async (jobId, userId, data) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        const hasComment = await job.hasUserComment(user.userId);
        if (!hasComment) {
            throw new AppError(400, 'Comment not found');
        }
        else {
            // console.log(job.__proto__);
            await job.setUserComments(user.userId, { through: { content: data.content, commentRate: data.commentRate } })
            return await job.getUserComments({ attributes: ["name", "avatar"] });
        }
    } catch (error) {
        throw error;
    }
}

const deleteComment = async (jobId, userId) => {
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new AppError(400, 'Job not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, 'User not found');
        }
        const hasComment = await job.hasUserComment(user.userId);
        if (!hasComment) {
            throw new AppError(400, 'Comment not found');
        }
        else {
            await job.removeUserComment(user.userId);
            return 'Delete comment success';
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getListComment,
    getComment,
    getJobComment,
    createdComment,
    updateComment,
    deleteComment,
}
