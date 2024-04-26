const mongoose = require("mongoose");

// Define the schema for the checklist
const ChecklistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itemModel'
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model("checklistModel", ChecklistSchema, "checklists")