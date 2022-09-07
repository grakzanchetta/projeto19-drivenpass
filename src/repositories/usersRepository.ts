import prisma from "../database/database";
import * as types from "../interfaces/interfaces";

async function findUserByEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
}

async function insertUser(user: types.CreateAndAuthenticateUser) {
  await prisma.users.create({
    data: user,
  });
}

export { findUserByEmail, insertUser };
