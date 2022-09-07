import { Request, Response } from "express";
import * as userServices from "../services/usersServices";

async function createUser(req: Request, res: Response) {
  const user = req.body;
  const createdUser = await userServices.createUser(user);
  console.log(createdUser);
  res.status(201).send(createdUser);
}

export { createUser };
