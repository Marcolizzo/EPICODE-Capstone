const express = require("express");
const router = express.Router();
const verified = require('../middelwares/verifyToken');
const { validate } = require('../validation/validatorMiddelware');
const { userValidator } = require('../validation/validationSchemas/userValidator');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');


router.get('/users', verified, getUsers);
router.get('/users/:id', verified, getUserById);
router.post('/users', validate(userValidator), createUser);
router.patch('/users/:id', verified, updateUser);
router.delete('/users/:id', verified, deleteUser);

module.exports = router;