const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const verified = require('../middelwares/verifyToken');
const { validate } = require('../validation/validationConfig');
const { userSchema } = require('../validation/validationSchemas/userSchema');


router.get('/users', verified, getUsers);
router.get('/users/:id', verified, getUserById);
router.post('/users', validate(userSchema), createUser);
// router.patch('/users/:id', verified, updateUser);
router.delete('/users/:id', verified, deleteUser);

module.exports = router;