import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/index.js";
import ApiError from "../utils/ApiError.js";
import path from "node:path";

export const errorHandler = async (err, req, res, next) => {
    let statusCode = 500;
    let message = "lỗi hệ thống";
    let data = null;

    if (err instanceof ZodError) {
        statusCode = 400;
        message = "Dữ liệu nhập vào không hợp lệ";
        const errorsList = {};
        err.issues.forEach(issues => {
            const fieldName = issues.path[issues.path.length - 1];
            errorsList[fieldName] = issues.message;
        });
        console.log(errorsList);

        data = errorsList;
    } else if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        data = err.message;
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 500;
        message = "lỗi hệ thống";
    }
    console.error(`[ERROR] ${req.method} ${req.url}:`, {
        code: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: data,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
}