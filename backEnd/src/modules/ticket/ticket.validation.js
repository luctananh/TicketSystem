import { create } from "node:domain";
import { title } from "node:process";
import { email, z } from "zod";

export const getTicketSchema = z.object({
    params: z.object({
        id: z.coerce.number("ID phải là số")
    }),
});

export const createTichketSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Tiêu đề không được trống"),
        description: z.string().nullable().optional(),
        status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).default("OPEN"),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
        dueDate: z.coerce.date().nullable().optional(),
        createdBy: z.coerce.number().int().positive("ID người tạo không hợp lệ"),
        ticketUsers: z.array(z.object({
            userId: z.coerce.number().int(),
            role: z.enum(["DEV", "TESTER"]), // Phải khớp với TicketUserRole trong Prisma
            isMain: z.boolean().default(false)
        })).optional()
    }).strict(),
});

export const updateTicketSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Tiêu đề không được trống"),
        description: z.string().nullable().optional(),
        status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
        dueDate: z.coerce.date().nullable().optional(),
        createdBy: z.coerce.number().int().positive(),
        ticketUsers: z.array(z.object({
            userId: z.coerce.number().int(),
            role: z.enum(["DEV", "TESTER"]),
            isMain: z.boolean().default(false)
        })).optional()
    }).strict(),
    params: z.object({
        id: z.coerce.number().int().positive("ID Ticket không hợp lệ")
    }),
});

export const deleteTicketSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive("ID Ticket không hợp lệ")
    }),
});