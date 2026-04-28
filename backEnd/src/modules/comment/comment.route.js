import express from 'express';
import {
    createComment,
    updateComment,
    deleteComment
} from './comment.controller.js';

const router = express.Router();

router.post("/", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;