import { Request, Response } from "express";
import * as cardServices from "../services/cardsServices";

import * as encryptServices from "../utils/encryptServices";

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

async function findAllCards(req: Request, res: Response) {
  const { user } = res.locals;
  const cardList = await cardServices.findAllCards(user.userId);

  for (let i = 0; i < cardList.length; i++) {
    cardList[i].password = encryptServices.decryptData(cardList[i].password);
    cardList[i].cvc = encryptServices.decryptData(cardList[i].cvc);
  }

  res.status(201).send(cardList);
}

async function findCardById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  const cardList = await cardServices.findCardById(user.userId, id);
  cardList.password = encryptServices.decryptData(cardList.password);
  cardList.cvc = encryptServices.decryptData(cardList.cvc);

  res.status(201).send(cardList);
}

async function deleteCard(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  await cardServices.findCardById(user.userId, id);
  await cardServices.deleteCard(id);

  res.status(201).send(`Card with id ${id} has been removed!`);
}

export { createCard, findAllCards, findCardById, deleteCard };
