// Import necessary modules
const express = require('express');
const connectToDatabase = require('./config/dbConfig');
const cors = require('cors');

// Import routes
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const listRoutes = require('./routes/listsRoutes');
const taskRoutes = require('./routes/tasksRoutes');
const commentRoutes = require('./routes/commentsRoutes');

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/', loginRoutes);
app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/', listRoutes);
app.use('/', taskRoutes);
app.use('/', commentRoutes);

// Connect to the database upon server startup
connectToDatabase();

// Start the server and listen on the specified port from environment variables
app.listen(process.env.PORT, () => console.log(`Server connected and listening on port ${process.env.PORT}`))