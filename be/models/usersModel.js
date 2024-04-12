const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    profileImg: {
        type: String,
        required: false,
        default:'https://res.cloudinary.com/duo0rtksl/image/upload/v1712915588/Capstone/gkwxk0laqxes0hpbut4m.png'
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
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(v);
            },
            message: props => 
                `The password must contain at least 8 characters and include at least one number, one uppercase letter, one lowercase letter, and one special character.`
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('userModel', UserSchema, 'users')