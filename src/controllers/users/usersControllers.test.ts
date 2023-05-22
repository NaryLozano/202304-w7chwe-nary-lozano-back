import { type NextFunction, type Request, type Response } from "express";
import { getUsers } from "./usersControllers.js";
import { usersMock } from "../../mocks/usersMock.js";
import User from "../../database/models/users.js";

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given a getUsers controller middleware", () => {
  describe("When it receives a request", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    User.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(usersMock) });
    test("Then it should emit a response with the status code 200 ", async () => {
      const expectedStatus = 200;

      await getUsers(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with list of users", async () => {
      const expectedJson = { users: usersMock };
      await getUsers(req as Request, res as Response, next as NextFunction);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });
});
