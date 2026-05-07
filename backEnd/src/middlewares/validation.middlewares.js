// import path from "node:path";
import * as z from "zod";
import { ZodError } from "zod"; // ĐẢM BẢO CÓ DÒNG NÀY

export const validate = (schema) => async (req, res, next) => {
    try {
        // schema.parse({
        //     body: req.body,
        //     query: req.query,
        //     params: req.params,
        // });
        // Lấy dữ liệu ĐÃ ĐƯỢC ÉP KIỂU (Validated Data)
        const validatedData = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        // Gán ngược lại dữ liệu đã là KIỂU SỐ vào req
        req.body = validatedData.body;
        Object.assign(req.params, validatedData.params);
        Object.assign(req.params, validatedData.params);
        return next();
    } catch (error) {

        if (error instanceof ZodError) {
            // Đảm bảo error.errors là một mảng trước khi dùng forEach
            // next(error);
            if (error.issues && Array.isArray(error.issues)) {
                const formattedErrors = {};

                error.issues.forEach(err => {
                    const fieldName = err.path[err.path.length - 1];

                    formattedErrors[fieldName] = err.message;
                });

                return res.status(400).json({
                    status: "error",
                    message: "Validation failed",
                    errors: formattedErrors
                });
            } else {
                // Trường hợp hiếm: là ZodError nhưng không có .errors hoặc .errors không phải mảng
                // Chuyển cho global error handler xử lý
                // console.error("ZodError but unexpected error.errors structure:", error);
                return next(error);
            }
        }
        // Nếu không phải ZodError, chuyển lỗi cho middleware xử lý lỗi tổng quát
        next(error);
    }
};


// export const validate = (schema) => async (req, res, next) => {
//     try {
//         const registerData = {
//             body: req.body,
//             query: req.query,
//             params: req.params
//         };
//         const check = await schema.parse(registerData);
//         next();
//     } catch (error) {
//         return res.status(400).json({
//             message: "Lỗi dữ liệu nhập vào"
//         });
//     }
// };