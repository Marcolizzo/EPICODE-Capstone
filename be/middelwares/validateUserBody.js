// Define middleware function to validate user input
const validateUserBody = (req, res, next) => {
    // Initialize array to store validation errors
    const errors = [];

    // Destructure user input from request body
    const { firstName, lastName, username, email, password } = req.body;

    // Validate
    if (typeof firstName !== "string" || firstName.trim() === "") {
        errors.push("firstName must be a non-empty string");
    }
    if (typeof lastName !== "string" || lastName.trim() === "") {
        errors.push("lastName must be a non-empty string");
    }
    if (typeof username !== "string" || username.trim() === "" || !/^[a-zA-Z0-9_.]+$/.test(username)) {
        errors.push("username must be a non-empty string containing only letters, numbers, dots, and underscores");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("please insert a valid email!");
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
        errors.push("The password must contain at least 8 characters and include at least one number, one uppercase letter, one lowercase letter, and one special character.");
    }
    if (errors.length > 0) {
        res.status(400).send({ errors })
    } else {
        next()
    }
};

module.exports = validateUserBody;