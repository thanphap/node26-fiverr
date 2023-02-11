const { response } = require('../helpers/response');
const commentService = require('../services/comment.service');

const getListComment = () => {
    return async (req, res, next) => {
        try {
            const comments = await commentService.getListComment();
            res.status(200).json(response(comments));
        } catch (error) {
            next(error);
        }
    };
};

const getComment = () => {
    return async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const comment = await commentService.getComment(commentId);
            res.status(200).json(response(comment));
        } catch (error) {
            next(error);
        }
    };
};

const getJobComment = () => {
    return async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const comments = await commentService.getJobComment(jobId);
            res.status(200).json(response(comments));
        } catch (error) {
            next(error);
        }
    };
};

const createdComment = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const jobId = data.jobId;
            const userId = res.locals.user.userId;
            const comment = await commentService.createdComment(jobId, userId, data);
            res.status(200).json(response(comment));
        } catch (error) {
            next(error);
        }
    };
};

const updateComment = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const jobId = data.jobId;
            const userId = res.locals.user.userId;
            const comment = await commentService.updateComment(jobId, userId, data);
            res.status(200).json(response(comment));
        } catch (error) {
            next(error);
        }
    };
};

const deleteComment = () => {
    return async (req, res, next) => {
        try {
            const jobId = req.body.jobId;
            const userId = res.locals.user.userId;
            const comment = await commentService.deleteComment(jobId, userId);
            res.status(200).json(response(comment));
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    getListComment,
    getComment,
    getJobComment,
    createdComment,
    updateComment,
    deleteComment,
}