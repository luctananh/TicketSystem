import express from 'express';
// import { getAuth } from './auth.controller';
const router = express.Router();

router.get("/auth/:id", getAuth);

export default router;