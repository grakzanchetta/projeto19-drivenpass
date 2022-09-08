import prisma from "../database/database";
import * as types from "../interfaces/interfaces";

async function insertCard(userId: number, cardData: types.CreateCard) {
  const cardInfo = {
    userId,
    ...cardData,
  };
  return await prisma.cards.create({
    data: cardInfo,
  });
}

async function findTagAndUser(userId: number, cardTag: string) {
  return await prisma.cards.findFirst({
    where: {
      userId,
      cardTag,
    },
  });
}

async function findAllCardsByUserId(userId: number) {
  return await prisma.cards.findMany({
    where: {
      userId,
    },
  });
}

async function findCardById(userId: number, id: number) {
  return await prisma.cards.findFirst({
    where: {
      userId,
      id,
    },
  });
}

export { insertCard, findTagAndUser, findAllCardsByUserId, findCardById };
