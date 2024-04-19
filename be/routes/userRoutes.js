const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { validate } = require('../validation/validator');
const { signupValidation } = require('../validation/validationSchemas/signupValidation');
const { updateUserValidation } = require('../validation/validationSchemas/updateUserValidation');
const { getUsers, getUserById, createUser, updateUser, deleteUser, updateProfileImage } = require('../controllers/userController');


router.get('/users', verified, getUsers);
router.get('/users/:id', verified, getUserById);
router.post('/users', validate(signupValidation), createUser);
router.patch('/users/:id', [verified, validate(updateUserValidation)], updateUser);
router.delete('/users/:id', verified, deleteUser);

router.post('/users/:id/updateProfileImage', verified, updateProfileImage);

module.exports = router;