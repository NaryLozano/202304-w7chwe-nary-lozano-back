import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../types/customError";

const debug = createDebug("items-api:server:middlewares:errorMiddleware");

export const errorNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug("Error Not found");
  const error = new CustomError(404, "Not found", "");
  next(error);
};

export const generalErrorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  const message = error.statusCode
    ? error.publicMessage
    : "Internal Server Error";
  res.status(statusCode).json({ message });
};
