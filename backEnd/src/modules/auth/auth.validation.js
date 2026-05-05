import { email, z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    role: z.enum(['DEV', 'TESTER']).optional(),
    password: z.string().min(6).optional(),
});