const CommentModel = require("../models/commentsModel");
const TaskModel = require("../models/tasksModel");
const UserModel = require("../models/usersModel");

// Define function to get all comments
const getComments = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.taskId)
    const comments = await CommentModel.find({_id: {$in: task.comments}});

    res.status(200).send(comments);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to get comment by ID
const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested comment does not exist!",
      });
    }

    res.status(200).send(comment);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to create a new comment
const createComment = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  const task = await TaskModel.findOne({ _id: req.params.taskId });
  const { text } = req.body;

  try {
    // Create and save new comment instance to the database
    const newComment = await CommentModel.create({
      author: user._id,
      text
    })

    await TaskModel.findByIdAndUpdate(task._id, {
      $push: { comments: newComment._id },
    })

    // Send response with newly created comment data
    res.status(201).send({
      statusCode: 201,
      payload: newComment,
    })

  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }

    // Check if the logged-in user is the creator of the comment
    if (comment.author.toString() !== req.user.userId.toString()) {
      return res.status(403).send({
        statusCode: 403,
        message:
          "Access denied. Only the creator of the comment can update it.",
      });
    }

    const updatedData = { text };
    const options = { new: true };
    const result = await CommentModel.findByIdAndUpdate(
      commentId,
      updatedData,
      options
    );

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found.",
      });
    }

    // Check if the logged-in user is the creator of the comment
    if (comment.author.toString() !== req.user.userId) {
      return res.status(403).send({
        statusCode: 403,
        message:
          "Access denied. Only the creator of the comment can delete it.",
      });
    }

    await CommentModel.findByIdAndDelete(commentId);

    // Update the task's comments array with the deleted comment ID
    await TaskModel.findByIdAndUpdate(req.params.taskId, {
      $pull: { comments: commentId },
    });

    res.status(200).send(`Comment with ID ${commentId} succesfully removed.`)

  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {getComments, getCommentById, createComment, updateComment, deleteComment};
