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

        return res.json(newUser);
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
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_TTL,
        });
        return res.json({ accessToken });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};