// Import necessary modules
const express = require('express');
const connectToDatabase = require('./config/dbConfig');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Connect to the database upon server startup
connectToDatabase();

// Start the server and listen on the specified port from environment variables
app.listen(process.env.PORT, () => console.log(`Server connected and listening on port ${process.env.PORT}`))