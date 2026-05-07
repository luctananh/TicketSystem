import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    statusUser
} from './user.controller.js';
import { validate } from '../../middlewares/validation.middlewares.js';
import {
    getUserByIdSchema,
    getUsersQuerySchema,
    createUserSchema,
    updateUserSchema,
    statusUserSchema
} from './user.validation.js';

const router = express.Router();

router.get("/", validate(getUsersQuerySchema), getUsers);
router.get("/:id", validate(getUserByIdSchema), getUserById);
router.post("/", validate(createUserSchema), createUser);
router.patch("/:id", validate(updateUserSchema), updateUser);
router.patch("/:id/status", validate(statusUserSchema), statusUser);

export default router;
