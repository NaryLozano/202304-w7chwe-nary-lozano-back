import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../types/customError.js";
import { type CustomRequest } from "../../types/types.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(
        401,
        "Unauthorized, Missing Authorization Token",
        "Unauthorized, you can't access to this page"
      );

      throw error;
    }

    const token = authorizationHeader.replace("Bearer", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;
    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(401, "Invalid Token", "Invalid Token")
        : error;

    next(customError);
  }
};

export default auth;
