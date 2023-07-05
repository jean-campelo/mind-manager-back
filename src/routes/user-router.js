import { Router } from "express";
import userController from "../controllers/user-controller.js";
import { createUserSchema, loginUser } from "../schemas/user.schema.js";
import { validateBody } from "../middlewares/authentication-middleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateBody(createUserSchema), userController.signUp);
userRouter.post("/login", validateBody(loginUser), userController.login)

export default userRouter;
