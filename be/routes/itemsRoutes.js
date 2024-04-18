const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');

router.get('/items', verified, getItems);
router.get('/items/:itemId', verified, getItemById);
router.post('/checklists/:checklistId/items', verified, createItem);
router.patch('/items/:itemId', verified, updateItem);
router.delete('/checklists/:checklistId/items/:itemId', verified, deleteItem);

module.exports = router;