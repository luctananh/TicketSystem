import { Role } from "../../../generated/prisma/index.js";
import { prisma } from "../../../lib/prisma.js";
import * as commentService from '../comment/comment.service.js';

export const createComment = async (req, res, next) => {
    try {
        // const commnetData = {
        //     id: req.params.id,
        //     ticketId: req.body.id,
        //     content: req.body.content
        // };
        const { ticketId, content, userId } = req.body;
        const commentData = { ticketId, content, userId };
        const newCommnet = await commentService.createComment(commnetData)
        res.json(newCommnet);
    } catch (error) {
        next(error);
    };
};