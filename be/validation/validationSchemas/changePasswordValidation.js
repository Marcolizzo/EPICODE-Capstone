const { body } = require("express-validator");

const changePasswordValidation = [
  // Validation for the current password field
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  // Validation for the new password field
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/)
    .withMessage("New password must contain at least one number, one uppercase letter, one lowercase letter, and one special character")
];

module.exports = { changePasswordValidation };
