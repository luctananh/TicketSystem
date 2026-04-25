import { Role } from "../../../generated/prisma/index.js";
import { prisma } from "../../../lib/prisma.js";
import * as ticketService from "../ticket/ticket.service.js"

// Lấy thông tin Ticket theo ID
export const getTicketId = async (req, res, next) => {
    try {
        const newTicketId = await ticketService.getTicketId(req.params.id);
        res.json(newTicketId);
    } catch (error) {
        next(error)
    };
};

// Lấy toàn bộ Ticket
export const getAllTicket = async (req, res, next) => {
    try {
        const newAllTicket = await ticketService.getAllTicket();
        res.json(newAllTicket)
    } catch (error) {
        next(error)
    };
};

export const createTicket = async (req, res, next) => {
    try {
        const newTicket = await ticketService.createTicket(req.body);
        res.json(newTicket);
    } catch (error) {
        next(error)
    };
};

export const updateTicket = async (req, res, next) => {
    try {
        const newUpdate = await ticketService.updateTicket(req.params.id, req.body);
        res.json(newUpdate);
    } catch (error) {
        next(error);
    };
};

export const deleteTicket = async (req, res, next) => {
    try {
        const deleteTicket = await ticketService.deleteTicket(req.params.id);
        res.json(deleteTicket);
    } catch (error) {
        next(error)
    };
};