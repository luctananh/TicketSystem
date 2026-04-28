import { Role } from "../../../generated/prisma/index.js";
import { prisma } from "../../../lib/prisma.js";
import * as userService from "./user.service.js";

// Lấy tất cả user hoặc theo email query param
export const getUsers = async (req, res, next) => {
    try {
        let users;
        if (req.query.email) {
            if (users.length == 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            users = await userService.getUsers(req.query.email);
        } else {
            users = await userService.getAllUsers();
        }
        res.json(users);
    } catch (error) {
        next(error);
    }
};

//Lấy user theo ID
export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// tạo người dùng mới
export const createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser)
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(404).json({ message: 'Email already exists' });
        }
        next(error);
    }
    console.log(error);
}

//chỉnh sửa User
export const updateUser = async (req, res, next) => {
    try {
        const updatePayload = {
            id: req.params.id,
            ...req.body
        }
        const updateUser = await userService.updateUser(updatePayload);
        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
}

// chỉnh sửa tranh thái hoạt động của user (không được phép xóa user do các quan hệ với comment)
export const statusUser = async (req, res, next) => {
    try {
        const statusData = {
            id: req.params.id,
            ...req.body
        }
        const newStatus = await userService.disableUser(statusData);
        res.status(204).send(newStatus)
    } catch (error) {
        if (error.message === 'Forbidden: Only ADMIN can change user status') {
            return res.status(404).json({ message: 'Forbidden: Only ADMIN can change user status' });
        }
        next(error)
    }
}

