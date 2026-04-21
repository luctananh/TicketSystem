import express from 'express';
// import { getAuth } from './auth.controller';
const router = express.Router();

router.get("/ticket", getAuth);

export default router;