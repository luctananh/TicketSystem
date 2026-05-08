import dotenv, { config } from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,

}

