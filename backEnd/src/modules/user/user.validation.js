import { z } from "zod";

// 1. Schema cho việc lấy thông tin chi tiết (GET /:id)
export const getUserByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive("ID người dùng không hợp lệ"),
    }),
});

// 2. Schema cho việc tìm kiếm theo email (GET /?email=...)
export const getUsersQuerySchema = z.object({
    query: z.object({
        email: z.string().email("Email không đúng định dạng").optional(),
    }),
});

// 3. Schema cho việc tạo người dùng mới (POST /)
export const createUserSchema = z.object({
    body: z.object({
        email: z.string().email("Email không đúng định dạng"),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        name: z.string().min(1, "Tên không được để trống"),
        role: z.enum(["ADMIN", "TESTER", "DEV"]).default("DEV"),
    }).strict(),
});

// 4. Schema cho việc cập nhật thông tin (PATCH /:id)
export const updateUserSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive("ID người dùng không hợp lệ"),
    }),
    body: z.object({
        email: z.string().email("Email không đúng định dạng").optional(),
        name: z.string().min(1, "Tên không được để trống").optional(),
        role: z.enum(["ADMIN", "TESTER", "DEV"]).optional(),
        isDeleted: z.boolean().optional(),
    }).strict(),
});

// 5. Schema cho việc thay đổi trạng thái (isDeleted)
export const statusUserSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive("ID người dùng không hợp lệ"),
    }),
    body: z.object({
        isDeleted: z.boolean({ required_error: "Trạng thái xóa là bắt buộc" }),
    }).strict(),
});
