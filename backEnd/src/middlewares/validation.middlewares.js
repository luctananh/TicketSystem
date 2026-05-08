import * as z from "zod";
import { ZodError } from "zod";

export const validate = (schema) => async (req, res, next) => {
    try {
        // Lấy dữ liệu ĐÃ ĐƯỢC ÉP KIỂU (Validated Data)
        const validatedData = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        // Gán ngược lại dữ liệu đã là KIỂU SỐ vào req
        req.body = validatedData.body;
        Object.assign(req.params, validatedData.params);
        Object.assign(req.query, validatedData.query);
        return next();
    } catch (error) {
        next(error);
    }
};


