import { type NextFunction, type Request, type Response } from "express";
import User from "../../database/models/users.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
