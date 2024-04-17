const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');


router.get('/projects', verified, getProjects);
router.get('/projects/:projectId', verified, getProjectById);
router.post('/projects', verified, createProject);
router.patch('/projects/:projectId', verified, updateProject);
router.delete('/projects/:projectId', verified, deleteProject);

module.exports = router;