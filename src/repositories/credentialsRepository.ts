import prisma from "../database/database";
import * as types from "../interfaces/interfaces";

async function insertCredential(
  userId: number,
  credentialData: types.CreateCredential
) {
  const credentialInfo = {
    userId,
    ...credentialData,
  };
  return await prisma.credentials.create({
    data: credentialInfo,
  });
}

async function findAllCredentialByUserId(userId: number) {
  return await prisma.credentials.findMany({
    where: {
      userId,
    },
  });
}

async function findCredentialById(userId: number, id: number) {
  return await prisma.credentials.findFirst({
    where: {
      userId,
      id,
    },
  });
}

async function deleteCredentialById(id: number) {
  return await prisma.credentials.delete({
    where: {
      id,
    },
  });
}

async function findTagAndUser(userId: number, credentialTag: string) {
  return await prisma.credentials.findFirst({
    where: {
      userId,
      credentialTag,
    },
  });
}

export {
  insertCredential,
  findAllCredentialByUserId,
  findCredentialById,
  deleteCredentialById,
  findTagAndUser,
};
