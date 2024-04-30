// Import necessary modules
const express = require("express");
const connectToDatabase = require("./config/dbConfig");
const cors = require("cors");

// Import routes
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/userRoutes");
const invitationRoutes = require("./routes/invitationsRoutes");
const projectRoutes = require("./routes/projectRoutes");
const listRoutes = require("./routes/listsRoutes");
const taskRoutes = require("./routes/tasksRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const checklistRoutes = require("./routes/checklistsRoutes");
const itemRoutes = require("./routes/itemsRoutes");

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use("/", loginRoutes);
app.use("/", userRoutes);
app.use("/", invitationRoutes);
app.use("/", projectRoutes);
app.use("/", listRoutes);
app.use("/", taskRoutes);
app.use("/", commentRoutes);
app.use("/", checklistRoutes);
app.use("/", itemRoutes);

// Connect to the database upon server startup
connectToDatabase();

// Start the server and listen on the specified port from environment variables
app.listen(process.env.PORT, () =>
  console.log(`Server connected and listening on port ${process.env.PORT}`)
);
