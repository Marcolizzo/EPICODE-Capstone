// Import necessary modules
require("dotenv").config();
const { cloudStorage, cloudinary } = require("../config/cloudinaryConfig");
const multer = require("multer");
const { extractPublicId } = require("cloudinary-build-url");
const UserModel = require("../models/usersModel");

const updateProfileImage = async (req, res) => {
  const cloudUpload = multer({ storage: cloudStorage }).single("profileImage");

  try {
    const user = await UserModel.findById(req.params.id);

    cloudUpload(req, res, async (err) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(500).send({
          statusCode: 500,
          message: "File Upload Error",
        });
      }

      const newImageUrl = req.file.path;
      const defaultImageId = process.env.CLOUDINARY_DEFAULT_PROFILE_IMAGE_ID;
      const prevImageId = extractPublicId(user.profileImg);

      if (prevImageId !== defaultImageId) {
        await cloudinary.uploader.destroy(prevImageId);
      }

      // Update user's profile image
      await UserModel.findByIdAndUpdate(
        user.id,
        { profileImg: newImageUrl },
        { new: true }
      );

      res.status(200).send({
        statusCode: 200,
        message: "Profile image update successful",
      });
    });
  } catch (e) {
    console.error("Controller error:", e);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const removeProfileImage = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const defaultImageId = process.env.CLOUDINARY_DEFAULT_PROFILE_IMAGE_ID;
    const defaultImageUrl = process.env.CLOUDINARY_DEFAULT_PROFILE_IMAGE_URL;
    const prevImageId = extractPublicId(user.profileImg);

    // Check if the user has a profile image
    if (prevImageId === defaultImageId) {
      return res.status(400).send({
        statusCode: 400,
        message: "User does not have a profile image",
      });
    }

    // Delete the previous profile image from Cloudinary
    await cloudinary.uploader.destroy(prevImageId);

    // Set the profile image field to the default image URL
    await UserModel.findByIdAndUpdate(
      user.id,
      { profileImg: defaultImageUrl },
      { new: true }
    );

    res.status(200).send({
      statusCode: 200,
      message: "Profile image removed successfully",
    });
    
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = { updateProfileImage, removeProfileImage };
