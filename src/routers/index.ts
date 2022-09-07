import { Router } from "express";
import userRouter from "./usersRouter";

const router = Router();
router.use(userRouter);

export default router;
