import { prisma } from "../../../lib/prisma.js";

export const findByEmail = (email) => {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true
        },
    });
};

export const creatSession = (sessionData) => {
    return prisma.session.create({
        data: {
            userId: sessionData.userId,
            refreshToken: sessionData.refreshToken,
            userAgent: sessionData.userAgent,
            ipAddress: sessionData.ipAddress,
            expiresAt: sessionData.expiresAt
        }
    });
};

export const register = (registerData) => {
    return prisma.user.create({
        data: {
            email: registerData.email,
            password: registerData.password,
            name: registerData.name,
            role: registerData.role
        },
    });
};

export const deleteSession = async (token) => {
    // console.log("REPOSITORY - DELETING SESSION WITH TOKEN:", token.refreshToken);
    return await prisma.session.deleteMany({
        where: {
            refreshToken: token.refreshToken,
            // userId: token.userId
        }
    });
    // console.log("REPOSITORY - DELETE RESULT:", result);

};

export const getSession = async (token) => {
    return await prisma.session.findUnique({
        where: { refreshToken: token },
        select: {
            id: true,
            userId: true,
            expiresAt: true
        }
    })
}