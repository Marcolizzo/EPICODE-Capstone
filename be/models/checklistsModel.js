const mongoose = require("mongoose");

// Define the schema for the checklist
const ChecklistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    items: [{
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model("checlistsSchema", ChecklistSchema, "checklists")