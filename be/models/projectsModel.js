const mongoose = require('mongoose');

// Define the schema for the project
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }],
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'listModel'
    }]
}, { timestamps: true, strict: true });

module.exports = mongoose.model('projectModel', ProjectSchema, 'projects');

