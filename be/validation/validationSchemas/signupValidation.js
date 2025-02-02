const { body } = require('express-validator');

const signupValidation = [
    // Validation for the firstName field
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('Fist name must be a non-empty string')
        .isAlpha()
        .withMessage('First name must contain only letters'),
    // Validation for the lastName field
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name must be a non-empty string')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('Last name must contain only letters'),
    // Validation for the username field
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username must be a non-empty string')
        .matches(/^[a-zA-Z0-9_.]+$/)
        .withMessage('Username must contain only letters, numbers, dots, and underscores'),
    // Validation for the email field
    body('email')
        .trim()
        // .normalizeEmail()
        .isEmail()
        .withMessage('Please insert a valid email'),
    // Validation for the password field
    body('password')
        .isLength({ min: 8 })
        .withMessage('The password must be at least 8 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/)
        .withMessage('The password must contain at least one number, one uppercase letter, one lowercase letter, and one special character')
];

module.exports = { signupValidation };