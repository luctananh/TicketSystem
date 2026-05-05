import * as authRepo from "./auth.repository.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_TTL = '30m';
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 //14 ngày 24 giờ 60 phút 60 giây


export const register = async (registerData) => {
    const existingUser = await authRepo.findByEmail(registerData.email)
    if (existingUser) {
        throw new Error('Email already exists');
    }
    registerData.password = await bcrypt.hash(registerData.password, 10);
    return authRepo.register(registerData);
    ;
};

export const logIn = async (loginData) => {
    const user = await authRepo.findByEmail(loginData.email)
    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Email hoặc Password không chính xác');
    }

    //tạo accessToken với JWT
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    );
    //tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString('hex');

    //tạo sesstion mới để lưu refresh Token
    await authRepo.creatSession({
        userId: user.id,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
    })
    //trả access Token, refresh token về 
    return { accessToken, refreshToken };
};