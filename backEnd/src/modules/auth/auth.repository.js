import { id } from "zod/v4/locales";
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
