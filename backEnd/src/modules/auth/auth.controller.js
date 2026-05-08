// import { email } from "zod";
import { secureHeapUsed } from "node:crypto";
import { Role } from "../../../generated/prisma/index.js";
import { prisma } from "../../../lib/prisma.js";
import * as authService from "./auth.service.js";

const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 //14 ngày 24 giờ 60 phút 60 giây
export const register = async (req, res, next) => {
    try {

        const registerData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        // console.log(registerData);
        const newUser = await authService.register(registerData);

        return res.status(201).json({
            "success": true,
            "message": "Success",
            "data": newUser
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const loginData = {
            email: req.body.email,
            password: req.body.password
        };
        const result = await authService.logIn(loginData);

        const accessToken = result.accessToken;
        const refreshToken = result.refreshToken;

        // Cấu hình cookie linh hoạt hơn
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: REFRESH_TOKEN_TTL,
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);
        return res.status(201).json({
            "success": true,
            "message": "Success",
            "data": accessToken
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        //lấy refresh token từ cookie
        const token = req.cookies?.refreshToken;
        // const userId = parseInt(req.user.id);
        // console.log("LOGOUT - REFRESH TOKEN FROM COOKIE:", token);

        if (token) {
            // console.log("Xóa session cho User:", userId, "với Token:", token);

            //xóa refresh token trong Session
            await authService.logout({ refreshToken: token })
            // await authService.logout({ refreshToken: token, userId: userId })

            //xóa Cookie với cùng cấu hình khi set
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy access token" });
        }
        const newToken = await authService.refreshToken(token);

        const accessToken = newToken.accessToken;
        // console.log(accessToken);
        const refreshToken = newToken.refreshToken;

        // Cấu hình cookie mới 
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: REFRESH_TOKEN_TTL,
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);
        return res.status(201).json({
            "success": true,
            "message": "Success",
            "data": accessToken
        });
    } catch (error) {
        // return res.status(500).json({ message: "Lỗi hệ thống" });
        next(error);
    }

};