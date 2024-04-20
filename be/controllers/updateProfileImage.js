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

module.exports = { updateProfileImage };
