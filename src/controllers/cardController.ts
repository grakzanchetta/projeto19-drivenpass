import { Request, Response } from "express";
import * as cardServices from "../services/cardsServices";

async function createCard(req: Request, res: Response) {
  const card = req.body;
  const { user } = res.locals;
  await cardServices.createCard(user.userId, card);

  res
    .status(201)
    .send(
      `The following card has been registered sucessfully: ${card.cardTag}`
    );
}

export { createCard };
