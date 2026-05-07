import express from 'express';
import { validate } from '../../middlewares/validation.middlewares.js';
import {
    createComment,
    updateComment,
    deleteComment
} from './comment.controller.js';
import {
    createCommentSchema,
    updateCommentSchema,
    deleteCommentSchema
} from './comment.validation.js';

const router = express.Router();

router.post("/", validate(createCommentSchema), createComment);
router.patch("/:id", validate(updateCommentSchema), updateComment);
router.delete("/:id", validate(deleteCommentSchema), deleteComment);

export default router;