import express, { Router } from 'express';
import userRoutes from '../modules/user/user.route.js';
// import authRoutes from '../modules/auth/auth.route.js';
import ticketRoutes from '../modules/ticket/ticket.route.js';

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/auth", authRoutes);
router.use("/tickets", ticketRoutes);

export default router;