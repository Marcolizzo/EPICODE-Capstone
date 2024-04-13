// Import necessary modules
const express = require('express');
const connectToDatabase = require('./config/dbConfig');
const cors = require('cors');

// Import routes
const loginRoute = require('./routes/loginRoutes');
const userRoute = require('./routes/userRoutes');

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/', loginRoute);
app.use('/', userRoute);

// Connect to the database upon server startup
connectToDatabase();

// Start the server and listen on the specified port from environment variables
app.listen(process.env.PORT, () => console.log(`Server connected and listening on port ${process.env.PORT}`))