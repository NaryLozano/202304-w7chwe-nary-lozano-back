import { Router } from "express";
import loginUser from "../../../controllers/users/usersControllers.js";

const userRouter = Router();

userRouter.post("/login", loginUser);

export default userRouter;
