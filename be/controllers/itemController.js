const ItemModel = require("../models/itemsModel");
const ChecklistModel = require("../models/checklistsModel");

// Define function to get all items
const getItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to get item by ID
const getItemById = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await ItemModel.findById(itemId);

    if (!item) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested item does not exist!",
      });
    }

    res.status(200).send(item);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Define function to create a new item
const createItem = async (req, res) => {
  const checklist = await ChecklistModel.findOne({ _id: req.params.checklistId });
  const { title } = req.body;

  try {
    // Create and save new item instance to the database
    const newItem = await ItemModel.create({
      title
    })

    await ChecklistModel.findByIdAndUpdate(checklist._id, {
      $push: { items: newItem._id },
    })

    // Send response with newly created item data
    res.status(201).send({
      statusCode: 201,
      payload: newItem,
    })

  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const { title } = req.body;

  try {
    const item = await ItemModel.findById(itemId);
    if (!item) {
      return res.status(404).send({
        statusCode: 404,
        message: "Item not found",
      });
    }

    const updatedData = { title };
    const options = { new: true };
    const result = await ItemModel.findByIdAndUpdate(
      itemId,
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

const deleteItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await ItemModel.findById(itemId);
    if (!item) {
      return res.status(404).send({
        statusCode: 404,
        message: "Item not found.",
      });
    }

    await ItemModel.findByIdAndDelete(itemId);

    // Update the checklist's items array with the deleted item ID
    await ChecklistModel.findByIdAndUpdate(req.params.checklistId, {
      $pull: { items: itemId },
    });

    res.status(200).send(`item with ID ${itemId} succesfully removed.`)

  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {getItems, getItemById, createItem, updateItem, deleteItem};
