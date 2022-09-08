import * as cardRepository from "../repositories/cardsRepository";
import * as types from "../interfaces/interfaces";
import * as encryptServices from "../utils/encryptServices";

async function createCard(userId: number, cardData: types.CreateCard) {
  const hashPassword = encryptServices.encryptData(cardData.password);
  const hashCVC = encryptServices.encryptData(cardData.cvc);
  const existingTag = await cardRepository.findTagAndUser(
    userId,
    cardData.cardTag
  );
  if (existingTag) {
    throw {
      type: "conflict",
      message: `Card with the Tag ${cardData.cardTag} already registered`,
    };
  }
  await cardRepository.insertCard(userId, {
    ...cardData,
    password: hashPassword,
    cvc: hashCVC,
  });
}

async function findAllCards(userId: number) {
  const cardsList = await cardRepository.findAllCardsByUserId(userId);
  return cardsList;
}

async function findCardById(userId: number, cardId: number) {
  const cardsList = await cardRepository.findCardById(userId, cardId);
  if (!cardsList) {
    throw {
      type: "unauthorized",
      message: `Card doesn't exist or don't belong to you`,
    };
  }
  return cardsList;
}

async function deleteCard(cardId: number) {
  await cardRepository.deleteCardById(cardId);
}

export { createCard, findAllCards, findCardById, deleteCard };
