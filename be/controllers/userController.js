// Import necessary modules
const UserModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

// Define function to get all users
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error: e.message
        })
    }
};

// Define function to get user by ID
const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: "The requested user does not exist!"
            })
        }

        res.status(200).send(user)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error: e.message
        })
    }
};

// Define function to create a new user
const createUser = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Generate hash for password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Check if user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(400).send({
            statusCode: 400,
            message: 'User already exists.'
        });
    }

    // Check if user with the same username already exists
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Username already in use.'
        })
    }

    try {
        // Create new user instance
        const newUser = new UserModel({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        })

        // Save new user to the database
        const userToSave = await newUser.save();

        // Format response data
        const userResponse = {
            _id: userToSave._id,
            firstName: userToSave.firstName,
            lastName: userToSave.lastName,
            username: userToSave.username,
            email: userToSave.email
        };

        // Send response with newly created user data
        res.status(201).send({
            statusCode: 201,
            payload: userResponse
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
};

// Define function to update user data
// const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { firstName, lastName, username } = req.body;

//     try {
//         const user = await UserModel.findById(id);
//         if (!user) {
//             return res.status(404).send({
//                 statusCode: 404,
//                 message: 'User not found'
//             });
//         }

//         // If new username provided, check if it's already in use
//         if (username && username !== user.username) {
//             const existingUser = await UserModel.findOne({ username });
//             if (existingUser) {
//                 return res.status(400).send({
//                     statusCode: 400,
//                     message: 'Username already in use'
//                 });
//             }
//         }





//         res.status(200).send(updatedUser);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// }

// Define function to delete user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'User not found.'
            });
        }

        res.status(200).send(`User with ID ${id} succesfully removed.`)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
};



module.exports = { getUsers, getUserById, createUser, /*updateUser,*/ deleteUser }