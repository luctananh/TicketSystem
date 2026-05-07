import express from 'express';
import { validate } from '../../middlewares/validation.middlewares.js';
import {
    getTicketId,
    getAllTicket,
    createTicket,
    updateTicket,
    deleteTicket
    // createComment
} from './ticket.controller.js';
import {
    getTicketSchema,
    createTichketSchema,
    updateTicketSchema,
    deleteTicketSchema
} from './ticket.validation.js'

const router = express.Router();

router.get("/", getAllTicket);
router.get("/:id", validate(getTicketSchema), getTicketId);
router.post("/", validate(createTichketSchema), createTicket);
router.patch("/:id", validate(updateTicketSchema), updateTicket);
router.delete("/:id", validate(deleteTicketSchema), deleteTicket);

// router.post("/:id/comments", createComment)

export default router;