const mongoose = require('mongoose');

// Define the schema for the user
const UserSchema = new mongoose.Schema({
    profileImg: {
        type: String,
        required: false,
        default: 'https://res.cloudinary.com/duo0rtksl/image/upload/v1712915588/Capstone/gkwxk0laqxes0hpbut4m.png'
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // projects: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'projectModel'
    // }]

}, { timestamps: true, strict: true })

module.exports = mongoose.model('userModel', UserSchema, 'users')