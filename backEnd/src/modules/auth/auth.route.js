import express from 'express';
import { registerSchema } from './auth.validation.js';
import {
    register,
    login,
    logout
} from './auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;