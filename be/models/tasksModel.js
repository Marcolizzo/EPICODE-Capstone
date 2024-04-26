const mongoose = require ("mongoose");

// Define the schema for the task
const TaskSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    completed: {
        type: Boolean,
        default: false
    },
    checklists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'checklistModel'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentModel'
    }]
} ,{timestamps: true , strict: true})

module.exports = mongoose.model("taskModel", TaskSchema, "tasks")