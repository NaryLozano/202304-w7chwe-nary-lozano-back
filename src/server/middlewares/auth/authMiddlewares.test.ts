import { type Request, type Response } from "express";
import { type CustomRequest } from "../../types/types";
import jwt from "jsonwebtoken";
import auth from "./authMiddlewares.js";
import CustomError from "../../types/customError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an auth middleware", () => {
  const token = "mock-token";
  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${token}`),
  };
  const res = {};
  const next = jest.fn();

  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the received next function", () => {
      jwt.verify = jest.fn();

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an authorization header with an invalid token and a next function", () => {
    test("Then it should call the received next function with a 401 'Invalid token' error", () => {
      const expectedError = new CustomError(
        401,
        "Invalid token",
        "Invalid token"
      );
      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an authorization header without bearer and a next function", () => {
    test("Then it should call the received next function with a 401 'Missing token' error", () => {
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(token),
      };
      const expectedError = new CustomError(
        401,
        "Unauthorized, Missing Authorization Token",
        "Unauthorized, Missing Authorization Token"
      );

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
