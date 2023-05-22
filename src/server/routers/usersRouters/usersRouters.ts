import { Router } from "express";
import { getUsers } from "../../../controllers/users/usersControllers.js";

const usersRouter = Router();
usersRouter.get("/", getUsers);

export default usersRouter;
