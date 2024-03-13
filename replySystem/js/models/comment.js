// models/comment.js
import mongoose from "mongoose"
const commentSchema = new mongoose.Schema({
    content: String,
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
});

export const Comment = mongoose.model('Comment', commentSchema);
