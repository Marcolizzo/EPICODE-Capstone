const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taskModel'
    }],
    tasksLimit: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('listsModel', ListSchema, 'lists');