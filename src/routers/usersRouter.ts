import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { userCreationSchema } from "../schemas/userSchema";
import * as userController from "../controllers/userController";

const userRouter = Router();

userRouter.post(
  "/signup",
  validateSchema(userCreationSchema),
  userController.createUser
);

export default userRouter;
