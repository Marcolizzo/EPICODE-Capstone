const ListModel = require("../models/listsModel");
const ProjectModel = require("../models/projectsModel");

// Define function to get all lists
const getLists = async (req, res) => {
  try {
    const lists = await ListModel.find();
    res.status(200).send(lists);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to get list by ID
const getListById = async (req, res) => {
  const { listId } = req.params;

  try {
    const list = await ListModel.findById(listId);

    if (!list) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested list does not exist!",
      });
    }

    res.status(200).send(list);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to create a new list
const createList = async (req, res) => {
  const project = await ProjectModel.findOne({ _id: req.params.projectId });
  const { title, tasksLimit } = req.body;

  try {
    // Create and save new list instance to the database
    const newList = await ListModel.create({
      title,
      tasks: [],
      tasksLimit,
    });

    await ProjectModel.findByIdAndUpdate(project._id, {
      $push: { lists: newList._id },
    });

    // Send response with newly created list data
    res.status(201).send({
      statusCode: 201,
      payload: newList,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateList = async (req, res) => {
  const { listId } = req.params;
  const { title, tasksLimit } = req.body;
  try {
    console.log(req);
    const list = await ListModel.findById(listId);
    if (!list) {
      return res.status(404).send({
        statusCode: 404,
        message: "List not found",
      });
    }

    const updatedData = { title, tasksLimit };
    const options = { new: true };
    const result = await ListModel.findByIdAndUpdate(listId, updatedData, options);

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteList = async (req, res) => {
  const { listId } = req.params;

  try {
    console.log(listId)
    const list = await ListModel.findByIdAndDelete(listId);
    if (!list) {
      return res.status(404).send({
        statusCode: 404,
        message: "List not found.",
      });
    }

    await ListModel.findByIdAndDelete(listId);

    // Update the user's projects array with the deleted project ID
    await ProjectModel.findByIdAndUpdate(req.params.projectId, {
      $pull: { lists: listId } 
  });

    res.status(200).send(`List with ID ${listId} succesfully removed.`);

  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
module.exports = { getLists, getListById, createList, updateList, deleteList };
