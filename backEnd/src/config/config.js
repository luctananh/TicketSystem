import dotenv, { config } from "dotenv";
dotenv.config();

export const env = {
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    PORT: process.env.PORT || 3000,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_TTL: 14 * 24 * 60 * 60 * 1000,
    ACCESS_TOKEN_TTL: '30m'
}

