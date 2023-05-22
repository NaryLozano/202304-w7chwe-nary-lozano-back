import "./loadEnvironments.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRouter from "./routers/user/userRouters.js";
import {
  generalErrorMiddleware,
  errorNotFound,
} from "./middlewares/error/errorMiddlewares.js";
import usersRouter from "./routers/usersRouters/usersRouters.js";
import auth from "./middlewares/auth/authMiddlewares.js";

export const app = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
];
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use("/user", userRouter);

app.use("/users", auth, usersRouter);

app.use(errorNotFound);
app.use(generalErrorMiddleware);
