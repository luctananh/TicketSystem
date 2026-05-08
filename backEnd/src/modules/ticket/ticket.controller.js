import { Role } from "../../../generated/prisma/index.js";
import { prisma } from "../../../lib/prisma.js";
import * as ticketService from "../ticket/ticket.service.js";

// Lấy thông tin Ticket theo ID
export const getTicketId = async (req, res, next) => {
    try {
        const ticketId = {
            id: req.params.id
        };
        const newTicketId = await ticketService.getTicketId(ticketId);
        return res.status(200).json({
            "success": true,
            "message": "Success",
            "data": newTicketId
        });
    } catch (error) {
        next(error)
    };
};

// Lấy toàn bộ Ticket
export const getAllTicket = async (req, res, next) => {
    try {
        const newAllTicket = await ticketService.getAllTicket();
        return res.status(200).json({
            "success": true,
            "message": "Success",
            "data": newAllTicket
        });
    } catch (error) {
        next(error)
    };
};

export const createTicket = async (req, res, next) => {
    try {
        const ticket = {
            createdBy: req.user.id,
            ...req.body
        };
        const newTicket = await ticketService.createTicket(ticket);
        return res.status(201).json({
            "success": true,
            "message": "Success",
            "data": newTicket
        });
    } catch (error) {
        next(error)
    };
};

export const updateTicket = async (req, res, next) => {
    try {
        const updatePayload = {
            id: req.params.id,
            ...req.body
        };
        const newUpdate = await ticketService.updateTicket(updatePayload);
        return res.status(200).json({
            "success": true,
            "message": "Success",
            "data": newUpdate
        });
    } catch (error) {
        next(error);
    };
};

export const deleteTicket = async (req, res, next) => {
    try {
        const deletedTicket = await ticketService.deleteTicket(req.params.id);
        return res.status(204).json({
            "success": true,
            "message": "Success",
            "data": deletedTicket
        });
    } catch (error) {
        next(error)
    };
};

// export const createComment = async (req, res, next) => {
//     try {
//         const commentData = {
//             ticketId: req.params.id,      // Lấy từ URL /tickets/:id/comments
//             userId: req.body.userId,      // Lấy từ Body JSON
//             content: req.body.content     // Lấy từ Body JSON
//         };
//         const newComment = await ticketService.createComment(commentData);
//         res.json(newComment);

//     } catch (error) {
//         next(error)
//     };
// };