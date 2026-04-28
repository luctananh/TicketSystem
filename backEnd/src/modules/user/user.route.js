import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    statusUser
} from './user.controller.js'; // Import cả getUserById

const router = express.Router();

router.get("/", getUsers); // Lấy tất cả user hoặc theo email query param
router.get("/:id", getUserById); // Lấy user theo ID
router.post("/", createUser);// tạo người dùng mới
router.patch("/:id", updateUser); //chỉnh sửa User
router.patch("/:id", statusUser); // chỉnh sửa tranh thái hoạt động của user (không được phép xóa user do các quan hệ với comment)

export default router;