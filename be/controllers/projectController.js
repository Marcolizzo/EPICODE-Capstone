const ProjectModel = require('../models/projectsModel');
const UserModel = require('../models/usersModel');

// Define function to get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).send(projects)
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        })
    }
};

// Define function to get project by ID
const getProjectById = async (req, res) => {
    const { id } = req.params

    try {
        const project = await ProjectModel.findById(id);

        if (!project) {
            return res.status(404).send({
                statusCode: 404,
                message: 'The requested project does not exist!'
            })
        }

        res.status(200).send(project)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
        })
    }
};

// Define function to create a new user
const createProject = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user.userId })
    const { title, description } = req.body

    try {
        // Create and save new project instance to the database
        const newProject = await ProjectModel.create({
            title,
            description,
            createdBy: user._id,
            lists: []
        })

        await UserModel.findByIdAndUpdate(user._id, {
            $push: { projects: newProject._id }
        })

        // Send response with newly created project data
        res.status(201).send({
            statusCode: 201,
            payload: newProject
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
};

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const project = await ProjectModel.findById(id);
        if (!project) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Project not found'
            })
        }

        // Check if the logged-in user is the creator of the project
        if (project.createdBy.toString() !== req.user.userId) {
            return res.status(403).send({
                statusCode: 403,
                message: 'Access denied. Only the creator of the project can update it.'
            })
        }
        const updatedData = { title, description }
        const options = { new: true };
        const result = await ProjectModel.findByIdAndUpdate(id, updatedData, options)

        res.status(200).send(result);


    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        })
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await ProjectModel.findById(id)
        if (!project) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Project not found.'
            });
        }

        // Check if the logged-in user is the creator of the project
        if (project.createdBy.toString() !== req.user.userId) {
            return res.status(403).send({
                statusCode: 403,
                message: 'Access denied. Only the creator of the project can delete it.'
            })
        }

        await ProjectModel.findByIdAndDelete(id)
        res.status(200).send(`Project with ID ${id} succesfully removed.`)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
}

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject }