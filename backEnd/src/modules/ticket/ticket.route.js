import express from 'express';
import {
    getTicketId,
    getAllTicket,
    createTicket,
    updateTicket,
    deleteTicket
} from './ticket.controller';

const router = express.Router();

router.get("/", getAllTicket);
router.get("/:id", getTicketId);
router.post("/", createTicket);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;