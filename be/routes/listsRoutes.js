const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getLists, getListById, createList, updateList, deleteList} = require('../controllers/listController');

router.get('/lists', verified, getLists);
router.get('/lists/:id', verified, getListById);
router.post('/projects/:id/lists', verified, createList);
router.patch('/lists/:id', verified, updateList);
router.delete('/lists/:id', verified, deleteList);

module.exports = router;