import { prisma } from "../../../lib/prisma.js";
import * as userService from "./user.service.js";

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
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const existingUser = await userService.getUsers(req.body.email);// kiểm ra email đã tồn tại chưa
        // console.log('data', existingUser);
        if (existingUser.length > 0) {
            return res.status(404).json({ message: 'Email already exists' });
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser)
    } catch (err) {
        next(err);
    }
}