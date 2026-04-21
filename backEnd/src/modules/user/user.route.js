import express from 'express';
import {
    getUsers,
    getUserById,
    createUser
} from './user.controller.js'; // Import cả getUserById

const router = express.Router();
//user
router.get("/", getUsers); // Lấy tất cả user hoặc theo email query param
router.get("/:id", getUserById); // Lấy user theo ID
router.post("/", createUser);// tạo người dùng mới
// ticket

export default router;