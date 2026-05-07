import { email, z } from "zod";

export const createCommentSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Nội dung trống"),
        ticketId: z.coerce.number().int({ invalid_type_error: "Ticket ID phải là số" }),
        userId: z.coerce.number().int({ invalid_type_error: "User ID phải là số" }),
    }).strict(),
});

export const updateCommentSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Nội dung trống"),
        ticketId: z.coerce.number().int({ invalid_type_error: "Ticket ID phải là số" }),
        userId: z.coerce.number().int({ invalid_type_error: "User ID phải là số" }),
    }).strict(),
    params: z.object({
        id: z.coerce.number().int().positive("ID Ticket không hợp lệ")
    }),
});

export const deleteCommentSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive("ID Ticket không hợp lệ")
    }),
});