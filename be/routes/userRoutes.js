const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, /*updateUser,*/ deleteUser } = require('../controllers/userController');
const verified = require('../middelwares/verifyToken');
const validateUserBody = require("../middelwares/validateUserBody");


router.get('/users', verified, getUsers);
router.get('/users/:id', verified, getUserById);
router.post('/users',validateUserBody, createUser);
// router.patch('/users/:id', [verified, validateUserBody], updateUser);
router.delete('/users/:id', verified, deleteUser);

module.exports = router;