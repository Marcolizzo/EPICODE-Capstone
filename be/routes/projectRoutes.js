const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { sendInvitation } = require('../controllers/sendInvitation');


router.get('/projects', verified, getProjects);
router.get('/projects/:projectId', verified, getProjectById);
router.post('/projects', verified, createProject);
router.patch('/projects/:projectId', verified, updateProject);
router.delete('/projects/:projectId', verified, deleteProject);

// Send invitation link to users for a specific project
router.post('/users/:id/projects/:projectId/invite', verified, sendInvitation);

module.exports = router;