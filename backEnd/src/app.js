import express from 'express';
import routes from "./routes/index.js";
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express()

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);
export default app;