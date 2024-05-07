const ProjectModel = require("../models/projectsModel");
const UserModel = require("../models/usersModel");
const InvitationModel = require("../models/invitationModel");

const getInvitations = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId);
    const invitations = await InvitationModel.find({
      _id: { $in: user.invitations },
    }).populate("recipient sender project");

    res.status(200).send(invitations);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getInvitationById = async (req, res) => {
  const { invitationId } = req.params;

  try {
    const invitation = await InvitationModel.findById(invitationId).populate(
      "recipient sender project"
    );

    if (!invitation) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested invitation does not exist!",
      });
    }

    res.status(200).send(invitation);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createInvitation = async (req, res) => {
  const { recipientEmail, message } = req.body;
  const user = await UserModel.findOne({ _id: req.user.userId });
  const project = await ProjectModel.findById(req.params.projectId);
  const recipient = await UserModel.findOne({ email: recipientEmail });

  try {
    if (!recipient) {
      return res.status(404).send({
        statusCode: 404,
        message: "Invalid email address or user not found!",
      });
    } else if (recipient._id) {
      const newInvitation = await InvitationModel.create({
        recipient: recipient._id,
        sender: user._id,
        project: project._id,
        message,
      });

      await UserModel.findByIdAndUpdate(recipient._id, {
        $push: { invitations: newInvitation._id },
      });
    } else {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid email!",
      });
    }

    const invitationResponse = {
      recipient: recipient.email,
      sender: user.email,
      project: project.title,
      message,
    };

    res.status(201).send({
      statusCode: 201,
      payload: invitationResponse,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateInvitation = async (req, res) => {
  const { invitationId, projectId } = req.params;
  const { isRead, isAccepted } = req.body;
  const user = await UserModel.findOne({ _id: req.user.userId });

  try {
    const invitation = await InvitationModel.findById(invitationId);
    if (!invitation) {
      return res.status(404).send({
        statusCode: 404,
        message: "Invitation not found",
      });
    }

    // Check if the logged-in user is the recipient of the invitation
    if (invitation.recipient.toString() !== req.user.userId.toString()) {
      return res.status(403).send({
        statusCode: 403,
        message:
          "Access denied. Only the recipient of the invitation can read it.",
      });
    }

    if (isAccepted) {
      await UserModel.findByIdAndUpdate(user._id, {
        $push: { projects: projectId },
        $pull: { invitations: invitationId },
      });
      await ProjectModel.findByIdAndUpdate(projectId, {
        $push: { members: user._id },
      });
      await InvitationModel.findByIdAndDelete(invitationId);
    }

    const updatedData = { isRead, isAccepted };
    const options = { new: true };
    const result = await InvitationModel.findByIdAndUpdate(
      invitationId,
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

const deleteInvitation = async (req, res) => {
  const { invitationId } = req.params;

  try {
    const invitation = await InvitationModel.findById(invitationId);
    if (!invitation) {
      return res.status(404).send({
        statusCode: 404,
        message: "Invitation not found.",
      });
    }

    // Check if the logged-in user is the recipient of the invitation
    if (invitation.recipient.toString() !== req.user.userId) {
      return res.status(403).send({
        statusCode: 403,
        message:
          "Access denied. Only the recipient of the invitation can delete it.",
      });
    }

    // Delete the invitation from the database
    await InvitationModel.findByIdAndDelete(invitationId);

    // Update the user's invitation array with the deleted invitation ID
    await UserModel.findByIdAndUpdate(req.user.userId, {
      $pull: { invitations: invitationId },
    });

    res
      .status(200)
      .send(`Invitation with ID ${invitationId} succesfully removed.`);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getInvitations,
  getInvitationById,
  createInvitation,
  updateInvitation,
  deleteInvitation,
};
