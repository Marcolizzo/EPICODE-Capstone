const { body } = require('express-validator');

const updateUserValidation = [
    // Validation for the firstName field
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('Fist name must be a non-empty string')
        .isAlpha()
        .withMessage('First name must contain only letters')
        .optional(),
    // Validation for the lastName field
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name must be a non-empty string')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('Last name must contain only letters')
        .optional(),
    // Validation for the username field
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username must be a non-empty string')
        .matches(/^[a-zA-Z0-9_.]+$/)
        .withMessage('Username must contain only letters, numbers, dots, and underscores')
        .optional(),
];

module.exports = { updateUserValidation };