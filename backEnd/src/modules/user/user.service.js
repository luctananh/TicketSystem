import * as userRepo from "./user.repository.js";
import bcrypt from "bcryptjs";

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
    const existingUser = await userRepo.findByEmail(userData.email)
    if (existingUser.length > 0) {
        throw new Error('Email already exists');
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    return userRepo.createUser(userData);
};

export const updateUser = async (id, userUpdateData) => {
    // if (userUpdateData.email) {
    //     const existingUser = await userRepo.findByEmail(userUpdateData.email)
    //     if (existingUser && existingUser.id !== parseInt(id)) {
    //         throw new Error('Email already exists');
    //     }
    // }
    // userUpdateData.password = await bcrypt.hash(userUpdateData.password, 10);
    return userRepo.updateUser(id, userUpdateData);

}

export const disableUser = async (id, isActiveStatus, requesterUser) => {
    // Vẫn kiểm tra quyền ADMIN
    if (requesterUser.role !== 'ADMIN') {
        throw new Error('Forbidden: Only ADMIN can change user status');
    }

    const user = await userRepo.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    // Truyền isActiveStatus (true/false) xuống repository
    return userRepo.disableUser(id, isActiveStatus);
};