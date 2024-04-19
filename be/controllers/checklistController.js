const ChecklistModel = require("../models/checklistsModel");
const TaskModel = require("../models/tasksModel");
const UserModel = require("../models/usersModel");
const ItemModel = require("../models/itemsModel");

// Define function to get all checklists
const getChecklists = async (req, res) => {
  try {
    const checklists = await ChecklistModel.find();
    res.status(200).send(checklists);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to get checklist by ID
const getChecklistById = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const checklist = await ChecklistModel.findById(checklistId);

    if (!checklist) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested checklist does not exist!",
      });
    }

    res.status(200).send(checklist);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to create a new checklist
const createChecklist = async (req, res) => {
  const task = await TaskModel.findOne({ _id: req.params.taskId });
  const { title } = req.body;

  try {
    // Create and save new checklist instance to the database
    const newChecklist = await ChecklistModel.create({
      title,
      items: []
    })

    await TaskModel.findByIdAndUpdate(task._id, {
      $push: { checklists: newChecklist._id },
    })

    // Send response with newly created checklist data
    res.status(201).send({
      statusCode: 201,
      payload: newChecklist,
    })

  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateChecklist = async (req, res) => {
  const { checklistId } = req.params;
  const { title } = req.body;

  try {
    const checklist = await ChecklistModel.findById(checklistId);
    if (!checklist) {
      return res.status(404).send({
        statusCode: 404,
        message: "Checklist not found",
      });
    }

    const updatedData = { title };
    const options = { new: true };
    const result = await ChecklistModel.findByIdAndUpdate(
      checklistId,
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

const deleteChecklist = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const checklist = await ChecklistModel.findById(checklistId);
    if (!checklist) {
      return res.status(404).send({
        statusCode: 404,
        message: "Checklist not found.",
      });
    }

    // Delete all items associated with each checklist
    await ItemModel.deleteMany({ _id: { $in: checklist.items } });

    // Delete the checklist from the database
    await ChecklistModel.findByIdAndDelete(checklistId);

    // Update the task's checklists array with the deleted checklist ID
    await TaskModel.findByIdAndUpdate(req.params.taskId, {
      $pull: { checklists: checklistId },
    });

    res.status(200).send(`Checklist with ID ${checklistId} succesfully removed.`)

  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {getChecklists, getChecklistById, createChecklist, updateChecklist, deleteChecklist};
