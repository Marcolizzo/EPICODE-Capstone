const mongoose = require("mongoose");

// Define the schema for the invitation
const InvitationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projectModel",
    },
    message: {
      type: String,
      required: false,
      max: 200,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model(
  "invitationModel",
  InvitationSchema,
  "invitations"
);
