import { Router } from "express";
import cardRouter from "./cardsRouter";
import userRouter from "./usersRouter";

const router = Router();
router.use(userRouter);
router.use(cardRouter);

export default router;
