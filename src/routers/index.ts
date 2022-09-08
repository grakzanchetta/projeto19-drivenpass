import { Router } from "express";
import cardRouter from "./cardsRouter";
import notesRouter from "./notesRouter";
import userRouter from "./usersRouter";

const router = Router();
router.use(userRouter);
router.use(cardRouter);
router.use(notesRouter);

export default router;
