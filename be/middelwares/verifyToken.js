const jwt = require('jsonwebtoken')

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers['authorization'];

        // Check if token is provided
        if(!token) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Access denied. No token provided'
            })
        }

        // Verify token using JWT library
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach verified user data to request object
        req.user = verified;
        next();

    } catch (e) {
        res.status(403).send({
            statusCode: 403,
            message: 'Invalid token'
        })
    }
};

module.exports = verifyToken