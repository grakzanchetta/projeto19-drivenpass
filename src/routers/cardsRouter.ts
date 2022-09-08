import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { cardCreationSchema } from "../schemas/cardSchema";
import * as cardController from "../controllers/cardController";
import { validateToken } from "../middlewares/tokenAuthenticator";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateToken,
  validateSchema(cardCreationSchema),
  cardController.createCard
);

cardRouter.get("/cards", validateToken, cardController.findAllCards);
cardRouter.get("/cards/:id", validateToken, cardController.findCardById);

export default cardRouter;
