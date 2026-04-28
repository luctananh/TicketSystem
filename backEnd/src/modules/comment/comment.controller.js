import console from "console";
import { Role } from "../../../generated/prisma/index.js";
import { prisma } from "../../../lib/prisma.js";
import * as commentService from '../comment/comment.service.js';

export const createComment = async (req, res, next) => {
    try {
        const commentData = { ...req.body };
        const newComment = await commentService.createComment(commentData)
        res.json(newComment);

    } catch (error) {
        next(error);
    };
};

export const updateComment = async (req, res, next) => {
    try {
        const updatePayload = {
            id: req.params.id,
            ...req.body
        }
        const newUpdate = await commentService.updateComment(updatePayload);
        res.json(newUpdate);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const deleteComment = await commentService.deleteComment(req.params.id);
        res.json(deleteComment);
    } catch (error) {
        next(error);
    }
};

// export const updateComment = async (req, res, next) => {
//     try {
//         const { ticketId, content, userId } = req.body;
//         const updateData = { ticketId, content, userId };
//         // const updatePayload = {
//         //     id: req.parmas.id,
//         //     ...updateData
//         // }
//         // console.log(updatePayload);
//         const newUpdate = await commentService.updateComment(req.params.id, updateData);
//         res.json(newUpdate);
//     } catch (error) {
//         next(error);
//     }
// };

