import { type Response, type NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/users.js";
import { type UserCredentialsRequest } from "../../server/types/types.js";
import CustomError from "../../server/types/customError.js";

const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const invalidCredentials = new CustomError(
        401,
        "Invalid credentials",
        ""
      );
      throw invalidCredentials;
    }

    const tokenPayload = {
      sub: user._id.toString(),
      user: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
