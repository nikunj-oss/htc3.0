// models/reply.js
import mongoose from "mongoose"

const replySchema = new mongoose.Schema({
    content: String
});

export const Reply = mongoose.model('Reply', replySchema);
