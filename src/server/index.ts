import "./loadEnvironments.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRouter from "./routers/user/userRouters.js";
import { generalErrorMiddleware } from "./middlewares/errorMiddlewares.js";
import { errorNotFound } from "./middlewares/errorMiddlewares.js";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-nary-lozano-front.netlify.app/",
];
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use("/user", userRouter);

app.use(errorNotFound);
app.use(generalErrorMiddleware);
