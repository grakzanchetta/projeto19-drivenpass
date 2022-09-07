import { Request, Response } from "express";
import * as userServices from "../services/usersServices";

async function createUser(req: Request, res: Response) {
  const user = req.body;
  const createdUser = await userServices.createUser(user);
  res.status(201).send(createdUser);
}

async function loginUser(req: Request, res: Response) {
  const user = req.body;
  const madeLogin = await userServices.loginUser(user);

  res.status(201).send(madeLogin);
}

export { createUser, loginUser };
