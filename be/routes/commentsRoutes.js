const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../controllers/commentController');


router.get('/comments', verified, getComments);
router.get('/comments/:commentId', verified, getCommentById);
router.post('/tasks/:taskId/comments', verified, createComment);
router.patch('/comments/:commentId', verified, updateComment);
router.delete('/tasks/:taskId/comments/:commentId', verified, deleteComment);

module.exports = router;