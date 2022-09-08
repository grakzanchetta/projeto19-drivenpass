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

export { createCard };
