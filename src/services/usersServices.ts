import * as usersRepository from "../repositories/usersRepository";
import { encryptMasterPassword } from "../utils/encryptServices";
import * as types from "../interfaces/interfaces";

async function createUser(userData: types.CreateUser) {
  const userExists = await usersRepository.findUserByEmail(userData.email);
  if (userExists) {
    throw {
      type: "conflict",
      message: "email already registered. try another",
    };
  }
  if (userData.password.length < 10) {
    throw {
      type: "unauthorized",
      message: "password must be 10 characters long, at least",
    };
  }
  userData.password = encryptMasterPassword(userData.password);

  await usersRepository.insertUser(userData);
  return userData;
}

export { createUser };
