const UserModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // Check if the old password matches the current password in the database
    const user = await UserModel.findById(id);
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).send({
        statusCode: 400,
        message: "Current password is incorrect",
      });
    }

    // Check if the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).send({
        statusCode: 400,
        message: "New passwords do not match",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password in the database
    await UserModel.findByIdAndUpdate(id, { password: hashedNewPassword });

    res.status(200).send({
      statusCode: 200,
      message: "Password updated successfully",
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = { changePassword };