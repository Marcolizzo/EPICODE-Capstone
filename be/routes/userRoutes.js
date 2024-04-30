const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { validate } = require('../validation/validator');
const { signupValidation } = require('../validation/validationSchemas/signupValidation');
const { updateUserValidation } = require('../validation/validationSchemas/updateUserValidation');
const { changePasswordValidation } = require('../validation/validationSchemas/changePasswordValidation');
const { getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { updateProfileImage, removeProfileImage } = require('../controllers/updateProfileImage');
const { changePassword } = require('../controllers/changeUserPassword');


// router.get('/users', verified, getUsers);
router.get('/users/:id', getUserById);
router.post('/users', validate(signupValidation), createUser);
router.patch('/users/:id', [verified, validate(updateUserValidation)], updateUser);
router.delete('/users/:id', verified, deleteUser);

// Update profile image route
router.post('/users/:id/updateProfileImage', verified, updateProfileImage);
router.post('/users/:id/removeProfileImage', verified, removeProfileImage);

// Change password route
router.patch('/users/:id/changePassword', [verified, validate(changePasswordValidation)], changePassword);

module.exports = router;