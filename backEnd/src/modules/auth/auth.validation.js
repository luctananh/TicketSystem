import { email, z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email("Email không đúng định dạng"),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        name: z.string().min(1, "Tên không được để trống"),
        role: z.enum(["TESTER", "DEV"]).optional(),
    }).strict(),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Email không chính xác"),
        password: z.string().min(6, "Mật khẩu không chính xác"),
    }).strict(),
});

// export const registerSchema = z.object({
//     body: z.object({
//         name: z.string().min(1, "Tên không được để trống"),
//         email: z.string().email("Email không đúng định dạng"),
//         role: z.enum(['DEV', 'TESTER'], "Role không hợp lệ"),
//         password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
//     }),
// ví dụ cho params và query
//     params: z.object({
//         id: z.int()
//     }),
//     query: z.object({
//         page: z.string(),
//         limit: z.string()
//     })
// });