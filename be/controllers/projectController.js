const ProjectModel = require("../models/projectsModel");
const UserModel = require("../models/usersModel");
const ListModel = require("../models//listsModel");
const TaskModel = require("../models/tasksModel");
const CommentModel = require("../models/commentsModel");
const ChecklistModel = require("../models/checklistsModel");
const ItemModel = require("../models/itemsModel");

// Define function to get all projects
const getProjects = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId);
    const projects = await ProjectModel.find({
      _id: { $in: user.projects },
    });
    // .populate("createdBy members lists")

    res.status(200).send(projects);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to get project by ID
const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await ProjectModel.findById(projectId);
    // .populate(
    //   "createdBy members lists"
    // );

    if (!project) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested project does not exist!",
      });
    }

    res.status(200).send(project);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to create a new project
const createProject = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  const { title, description } = req.body;

  try {
    // Create and save new project instance to the database
    const newProject = await ProjectModel.create({
      title,
      description,
      createdBy: user._id,
      members: user._id,
    });

    await UserModel.findByIdAndUpdate(user._id, {
      $push: { projects: newProject._id },
    });

    // Send response with newly created project data
    res.status(201).send({
      statusCode: 201,
      payload: newProject,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description } = req.body;

  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).send({
        statusCode: 404,
        message: "Project not found",
      });
    }

    // Check if the logged-in user is the creator of the project
    if (project.createdBy.toString() !== req.user.userId.toString()) {
      return res.status(403).send({
        statusCode: 403,
        message:
          "Access denied. Only the creator of the project can update it.",
      });
    }

    const updatedData = { title, description };
    const options = { new: true };
    const result = await ProjectModel.findByIdAndUpdate(
      projectId,
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

const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).send({
        statusCode: 404,
        message: "Project not found.",
      });
    }

    // Check if the logged-in user is the creator of the project
    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).send({
        statusCode: 403,
        message:
          "Access denied. Only the creator of the project can delete it.",
      });
    }

    // Find all lists associated with the project
    const lists = await ListModel.find({ _id: { $in: project.lists } });
    for (const list of lists) {
      // Find all tasks associated with each list
      const tasks = await TaskModel.find({ _id: { $in: list.tasks } });
      for (const task of tasks) {
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
      }
      // Delete all tasks associated with each list
      await TaskModel.deleteMany({ _id: { $in: list.tasks } });
    }
    // Delete all lists associated with the project
    await ListModel.deleteMany({ _id: { $in: project.lists } });

    // Delete the project from the database
    await ProjectModel.findByIdAndDelete(projectId);

    // Update the user's projects array with the deleted project ID
    await UserModel.findByIdAndUpdate(req.user.userId, {
      $pull: { projects: projectId },
    });

    res.status(200).send(`Project with ID ${projectId} succesfully removed.`);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
