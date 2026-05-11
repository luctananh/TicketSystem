import * as authRepo from "./auth.repository.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import dotenv from "dotenv";
import { json } from "zod";
import { error } from "console";
import ApiError from "../../utils/ApiError.js";
import { env } from "../../config/config.js";

dotenv.config();

export const register = async (registerData) => {
    const existingUser = await authRepo.findByEmail(registerData.email)
    if (existingUser) {
        throw new ApiError(400, 'Email already exists');
    }
    registerData.password = await bcrypt.hash(registerData.password, 10);
    return authRepo.register(registerData);
};

export const logIn = async (loginData) => {
    const user = await authRepo.findByEmail(loginData.email)
    if (!user) {
        throw new ApiError(400, 'Người dùng không tồn tại');
        // return error('Người dùng không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(400, 'Password không chính xác');
    }

    //tạo accessToken với JWT
    const accessToken = jwt.sign(
        { id: user.id },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TOKEN_TTL }
    );
    //tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString('hex');

    //tạo sesstion mới để lưu refresh Token
    await authRepo.creatSession({
        userId: user.id,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_TTL)
    })
    //trả access Token, refresh token về 
    return { accessToken, refreshToken };
};

export const logout = async (token) => {
    return authRepo.deleteSession(token);
};

export const refreshToken = async (token) => {
    const session = await authRepo.getSession(token);

    if (!session || session.expiresAt < new Date()) {
        if (session) await authRepo.deleteSession({ refreshToken: token });
        throw new ApiError(400, 'Session không hợp lệ hoặc đã hết hạn');
    }

    await authRepo.deleteSession({ refreshToken: token });

    const accessToken = jwt.sign(
        { id: session.userId },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TOKEN_TTL }
    );
    //tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString('hex');

    //tạo sesstion mới để lưu refresh Token
    await authRepo.creatSession({
        userId: session.userId,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_TTL)
    })
    //trả access Token, refresh token về 
    return { accessToken, refreshToken };

};