import express from 'express';
import routes from "./routes/index.js";
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import cors from 'cors';
import { env } from './config/config.js';
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express()

app.use(express.json());
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);

export default app;