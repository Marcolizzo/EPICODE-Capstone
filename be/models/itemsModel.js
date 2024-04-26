const mongoose = require("mongoose");

// Define the schema for the item
const ItemSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
}, { timestamps: true, strict: true })

module.exports = mongoose.model("itemModel", ItemSchema, "items")