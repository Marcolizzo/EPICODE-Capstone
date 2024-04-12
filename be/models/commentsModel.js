const mongoose = require ("mongoose");

const CommentSchema = new mongoose.Schema ({
   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel'
   },
   text: {
    type: String,
    required: true
   }
} ,{timestamps: true , strict: true})

module.exports = mongoose.model("commentsSchema", CommentSchema, "comments")