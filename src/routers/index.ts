import { Router } from "express";
import cardRouter from "./cardsRouter";
import credentialsRouter from "./credentialsRouter";
import notesRouter from "./notesRouter";
import userRouter from "./usersRouter";
import wifiRouter from "./wifiRouter";

const router = Router();
router.use(userRouter);
router.use(cardRouter);
router.use(notesRouter);
router.use(wifiRouter);
router.use(credentialsRouter);

export default router;
