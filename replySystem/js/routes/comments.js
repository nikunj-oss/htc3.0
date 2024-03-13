// routes/comments.js

import express from "express"
import {Comment} from "../models/comment.js"
import {Reply} from "../models/reply.js"

const router = express.Router();

// POST a new comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST a reply to a comment
router.post('/:commentId/replies', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const reply = new Reply({
            content: req.body.content
        });
        await reply.save();
        comment.replies.push(reply);
        await comment.save();

        res.status(201).json(reply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router