const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getLists, getListById, createList, updateList, deleteList} = require('../controllers/listController');

router.get('/projects/:projectId/lists', verified, getLists);
router.get('/lists/:listId', verified, getListById);
router.post('/projects/:projectId/lists', verified, createList);
router.patch('/lists/:listId', verified, updateList);
router.delete('/projects/:projectId/lists/:listId', verified, deleteList);

module.exports = router;