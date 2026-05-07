import express, { Router } from 'express';
import userRoutes from '../modules/user/user.route.js';
import authRoutes from '../modules/auth/auth.route.js';
import ticketRoutes from '../modules/ticket/ticket.route.js';
import commentRoutes from '../modules/comment/comment.route.js';
import { protectedRoute } from '../middlewares/accessToken.middlewares.js';

const router = express.Router();

router.use("/auth", authRoutes);

// router.post("/test", (req, res) => res.send("OK"));
router.use(protectedRoute);
router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);
router.use("/comments", commentRoutes);

export default router;