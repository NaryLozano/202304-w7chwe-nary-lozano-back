import { type NextFunction, type Response } from "express";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/users.js";
import loginUser from "./usersControllers.js";
import {
  type UserCredentialsRequest,
  type UserStructure,
} from "../../server/types/types.js";
import CustomError from "../../server/types/customError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given a loginUser middleware", () => {
  const validUser = {
    password: "starstuff",
    username: "carlSagan1",
  };

  const req: Pick<UserCredentialsRequest, "body"> = {
    body: validUser,
  };

  bcrypt.compare = jest.fn().mockResolvedValue(true);

  const user: UserStructure = {
    _id: new Types.ObjectId().toString(),
    username: "carlSagan",
    password: "starstuff",
  };

  const token = "theStrongestMeowEver";

  User.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(user),
  });

  jwt.sign = jest.fn().mockReturnValue(token);

  const expectedStatusCode = 200;

  const next = jest.fn();

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with valid credentials", () => {
    test("Then it should call the response status method with the status code 200", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response json method with token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
  describe("When it receives invalid user credentials and a next function", () => {
    test("Then it should call the next function with error 'Invalid credentials' and status 401", async () => {
      const error = new CustomError(401, "Invalid credentials", "");
      const invalidUser = {
        password: "starstuff",
        username: "carlsagan",
      };

      const reqInvalid: Pick<UserCredentialsRequest, "body"> = {
        body: invalidUser,
      };
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      await loginUser(
        reqInvalid as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
