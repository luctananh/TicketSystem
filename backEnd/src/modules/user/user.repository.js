import { prisma } from "../../../lib/prisma.ts";

export const findByEmail = (email) => {
    return prisma.user.findMany({
        where: { email },
        select: {
            id: true,
            email: true
        },
    });
};
export const getAllUsers = () => {
    return prisma.user.findMany({
        where: {},
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true
        },
    });
};
export const getUserById = (id) => {
    return prisma.user.findUnique({
        where: { id: parseInt(id) }, // Chuyển ID sang số nguyên
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true
        }
    });
};

export const createUser = (userData) => {
    return prisma.user.create({
        data: {
            email: userData.email,
            password: userData.password,
            role: userData.role,
            name: userData.name,
        },
    });
}