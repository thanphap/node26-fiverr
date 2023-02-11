const express = require('express');
const { getComment, getListComment, createdComment, updateComment, deleteComment, getJobComment } = require('../../controllers/comment.controller');
const authorization = require('../../middlewares/authorization');

const commentRouter = express.Router();

commentRouter.get('', getListComment());
commentRouter.get('/job/:jobId', getJobComment());
commentRouter.get('/:commentId', getComment());
commentRouter.post('', authorization, createdComment());
commentRouter.put('', authorization, updateComment());
commentRouter.delete('', authorization, deleteComment());

module.exports = commentRouter;