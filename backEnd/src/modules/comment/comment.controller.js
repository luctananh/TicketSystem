import console from "console";
import { Role } from "../../../generated/prisma/index.js";
import { prisma } from "../../../lib/prisma.js";
import * as commentService from '../comment/comment.service.js';

export const createComment = async (req, res, next) => {
    try {
        const commentData = {
            content: req.body.content,
            ticketId: req.body.ticketId,
            userId: req.body.userId
        };
        const newComment = await commentService.createComment(commentData)
        return res.status(201).json({
            "success": true,
            "message": "Success",
            "data": newComment
        });
    } catch (error) {
        next(error);
    };
};

export const updateComment = async (req, res, next) => {
    try {
        const updatePayload = {
            id: req.params.id,
            content: req.body.content,
            ticketId: req.body.ticketId,
            userId: req.body.userId
        }
        const newUpdate = await commentService.updateComment(updatePayload);
        res.status(200).json({
            "success": true,
            "message": "Success",
            "data": newUpdate
        });
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const deleteComment = await commentService.deleteComment(req.params.id);
        res.status(204).send();
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

