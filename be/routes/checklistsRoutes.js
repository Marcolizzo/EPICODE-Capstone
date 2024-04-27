const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { getChecklists, getChecklistById, createChecklist, updateChecklist, deleteChecklist } = require('../controllers/checklistController');

// checklist
router.get('/tasks/:taskId/checklists', verified, getChecklists);
router.get('/checklists/:checklistId', verified, getChecklistById);
router.post('/tasks/:taskId/checklists', verified, createChecklist);
router.patch('/checklists/:checklistId', verified, updateChecklist);
router.delete('/tasks/:taskId/checklists/:checklistId', verified, deleteChecklist);

module.exports = router;