import { Router } from "express";
import userController from "../controllers/user-controller.js";
import { createUserSchema } from "../schemas/new-user.schema.js";
import { validateBody } from "../middlewares/authentication-middleware.js";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateBody(createUserSchema),
  userController.signUp
);

export default userRouter;
