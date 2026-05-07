import express from 'express';
import { registerSchema, loginSchema } from './auth.validation.js';
import { protectedRoute } from '../../middlewares/accessToken.middlewares.js';
import { validate } from '../../middlewares/validation.middlewares.js';
import {
    register,
    login,
    logout,
    refreshToken
} from './auth.controller.js';

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
// router.post("/logout", protectedRoute, logout);
router.post("/refreshToken", refreshToken)

export default router;