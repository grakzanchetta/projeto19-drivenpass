import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { userCreationAndLoginSchema } from "../schemas/userSchema";
import * as userController from "../controllers/userController";

const userRouter = Router();

userRouter.post(
  "/signup",
  validateSchema(userCreationAndLoginSchema),
  userController.createUser
);

userRouter.post(
  "/login",
  validateSchema(userCreationAndLoginSchema),
  userController.loginUser
);

export default userRouter;
