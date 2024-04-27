const TaskModel = require("../models/tasksModel");
const ListModel = require("../models/listsModel");
const UserModel = require("../models/usersModel");
const CommentModel = require("../models/commentsModel");
const ChecklistModel = require("../models/checklistsModel");
const ItemModel = require("../models/itemsModel");

// Define function to get all tasks
const getTasks = async (req, res) => {
  try {
    const list = await ListModel.findById(req.params.listId).populate("tasks");
    const tasks = await TaskModel.find({ _id: { $in: list.tasks } })
      .populate("createdBy assignedTo checklists comments")
      .populate({
        path: "checklists",
        populate: {
          path: "items",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      });

    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to get task by ID
const getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await TaskModel.findById(taskId)
      .populate("createdBy assignedTo checklists comments")
      .populate({
        path: "checklists",
        populate: {
          path: "items",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      });

    if (!task) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested task does not exist!",
      });
    }

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to create a new task
const createTask = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  const list = await ListModel.findOne({ _id: req.params.listId });
  const { title, description, priority, assignedTo } = req.body;

  try {
    // Create and save new task instance to the database
    const newTask = await TaskModel.create({
      title,
      description,
      priority,
      createdBy: user._id,
      assignedTo,
    });

    await ListModel.findByIdAndUpdate(list._id, {
      $push: { tasks: newTask._id },
    });

    // Send response with newly created task data
    res.status(201).send({
      statusCode: 201,
      payload: newTask,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, assignedTo, completed } = req.body;

  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).send({
        statusCode: 404,
        message: "Task not found",
      });
    }

    const updatedData = { title, description, priority, assignedTo, completed };
    const options = { new: true };
    const result = await TaskModel.findByIdAndUpdate(
      taskId,
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

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).send({
        statusCode: 404,
        message: "Task not found.",
      });
    }

    // Delete all comments associated with each task
    await CommentModel.deleteMany({ _id: { $in: task.comments } });
    // Find all checklists associated with each task
    const checklists = await ChecklistModel.find({
      _id: { $in: task.checklists },
    });
    for (const checklist of checklists) {
      // Delete all items associated with each checklist
      await ItemModel.deleteMany({ _id: { $in: checklist.items } });
    }
    // Delete all checklists associated with each task
    await ChecklistModel.deleteMany({ _id: { $in: task.checklists } });

    // Delete the task from the database
    await TaskModel.findByIdAndDelete(taskId);

    // Update the lists's tasks array with the deleted task ID
    await ListModel.findByIdAndUpdate(req.params.listId, {
      $pull: { tasks: taskId },
    });

    res.status(200).send(`Task with ID ${taskId} succesfully removed.`);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
