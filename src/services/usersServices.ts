import * as usersRepository from "../repositories/usersRepository";
import * as encryptServices from "../utils/encryptServices";
import * as type from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sign } from "crypto";

async function createUser(userData: type.CreateAndAuthenticateUser) {
  await validateSignUp(userData);
  userData.password = encryptServices.encryptMasterPassword(userData.password);
  await usersRepository.insertUser(userData);
  return userData;
}

async function validateSignUp(userData: type.CreateAndAuthenticateUser) {
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
  return userData;
}

async function loginUser(userData: type.CreateAndAuthenticateUser) {
  await validateLogin(userData);
  const token = await generateToken(userData);
  return token;
}

async function validateLogin(userData: type.CreateAndAuthenticateUser) {
  const { email, password } = userData;
  const userExists = await usersRepository.findUserByEmail(email);

  if (!userExists) {
    throw {
      type: "not_found",
      message: "email not found",
    };
  }
  const isCorrectPassword = await bcrypt.compare(password, userExists.password);
  if (isCorrectPassword === false) {
    throw {
      type: "unauthorized",
      message: "wrong password",
    };
  }
}

async function generateToken(userData: type.CreateAndAuthenticateUser) {
  const userExists = await usersRepository.findUserByEmail(userData.email);
  const userId = userExists?.id;

  const token = jwt.sign({ userId }, String(process.env.JWT_KEY), {
    expiresIn: process.env.JWT_TOKEN_DURATION,
  });
  return token;
}

export { createUser, loginUser };
