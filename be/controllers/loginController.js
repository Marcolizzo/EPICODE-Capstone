// Import necessary modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");
const router = require("../routes/userRoutes");

// Define login function
const login = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find user in the database by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Invalid email or password.'
            });
        }

        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Invalid email or password.'
            });
        }

        // Generate JWT token with user ID payload, using secret key and expiration time
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h"
        });

        res.setHeader('Authorization', token)
        res.status(200).send({
            statusCode: 200,
            message: 'Login successful',
            token
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
};

module.exports = login;