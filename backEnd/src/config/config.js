import dotenv, { config } from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
}