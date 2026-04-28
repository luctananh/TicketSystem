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
            isDeleted: true,
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
            isDeleted: true,
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

export const updateUser = (updatePayload) => {
    // console.log("DATA UPDATE:", userUpdateData);
    return prisma.user.update({
        where: { id: parseInt(updatePayload.id) },
        data: {
            email: updatePayload.email,
            name: updatePayload.name,
            role: updatePayload.role,
            isDeleted: updatePayload.isDeleted
        }
    })

}

export const statusUser = (statusData) => {
    return prisma.user.update({
        where: { id: parseInt(statusData.id) },
        data: { isDeleted: statusData }
    });
};