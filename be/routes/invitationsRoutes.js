const express = require("express");
const router = express.Router();
const verified = require("../middelwares/verifyToken");
const {
  getInvitations,
  getInvitationById,
  createInvitation,
  updateInvitation,
  deleteInvitation,
} = require("../controllers/invitationController");

router.get("/invitations", verified, getInvitations);
router.get("/invitations/:invitationId", verified, getInvitationById);
router.post("/projects/:projectId/invitations", verified, createInvitation);
router.patch(
  "/projects/:projectId/invitations/:invitationId",
  verified,
  updateInvitation
);
router.delete("/invitations/:invitationId", verified, deleteInvitation);

module.exports = router;
