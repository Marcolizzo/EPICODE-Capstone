const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');


router.get('/lists/:listId/tasks', verified, getTasks);
router.get('/tasks/:taskId', verified, getTaskById);
router.post('/lists/:listId/tasks', verified, createTask);
router.patch('/tasks/:taskId', verified, updateTask);
router.delete('/lists/:listId/tasks/:taskId', verified, deleteTask);

module.exports = router;