// Import necessary modules
const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to MongoDB database
const connectToDatabase = () => {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URL);

    // Listen for 'error' event and log any errors
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error!'));

    // Listen for 'open' event and log successful connection
    db.once('open', () => {
        console.log('Database successfully connected!');
    });
};

// Export the connectToDatabase function for external use
module.exports = connectToDatabase;