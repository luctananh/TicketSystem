import * as userRepo from "./user.repository.js";
import bcrypt from "bcryptjs"
//USER
export const getUsers = async (email) => {
    return userRepo.findByEmail(email);
};
export const getAllUsers = async () => {
    return userRepo.getAllUsers();
};
export const getUserById = async (id) => {
    return userRepo.getUserById(id);
};
export const createUser = async (userData) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    return userRepo.createUser(userData);
};