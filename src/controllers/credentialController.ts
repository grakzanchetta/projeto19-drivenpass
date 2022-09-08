import { Request, Response } from "express";
import * as credentialsServices from "../services/credentialsServices";
import * as encryptServices from "../utils/encryptServices";

async function createCredential(req: Request, res: Response) {
  const credential = req.body;
  const { user } = res.locals;
  await credentialsServices.createCredential(user.userId, credential);

  res
    .status(201)
    .send(
      `The following credential has been registered sucessfully: ${credential.credentialTag}`
    );
}

async function findAllCredentials(req: Request, res: Response) {
  const { user } = res.locals;
  const credentialsList = await credentialsServices.findAllCredentials(
    user.userId
  );

  for (let i = 0; i < credentialsList.length; i++) {
    credentialsList[i].password = encryptServices.decryptData(
      credentialsList[i].password
    );
  }

  res.status(201).send(credentialsList);
}

async function findCredentialById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  const credentialList = await credentialsServices.findCredentialById(
    user.userId,
    id
  );
  credentialList.password = encryptServices.decryptData(
    credentialList.password
  );

  res.status(201).send(credentialList);
}

async function deleteCredential(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  await credentialsServices.findCredentialById(user.userId, id);
  await credentialsServices.deleteCredential(id);

  res.status(201).send(`Wifi with id ${id} has been removed!`);
}

export {
  createCredential,
  findAllCredentials,
  findCredentialById,
  deleteCredential,
};
