import * as credentialsRepository from "../repositories/credentialsRepository";
import * as types from "../interfaces/interfaces";
import * as encryptServices from "../utils/encryptServices";

async function createCredential(
  userId: number,
  credentialData: types.CreateCredential
) {
  const existingTag = await credentialsRepository.findTagAndUser(
    userId,
    credentialData.credentialTag
  );
  if (existingTag) {
    throw {
      type: "conflict",
      message: `Note with the Tag ${credentialData.credentialTag} already registered`,
    };
  }
  const hashPassword = encryptServices.encryptData(credentialData.password);
  await credentialsRepository.insertCredential(userId, {
    ...credentialData,
    password: hashPassword,
  });
}

async function findAllCredentials(userId: number) {
  const credentialList = await credentialsRepository.findAllCredentialByUserId(
    userId
  );
  return credentialList;
}

async function findCredentialById(userId: number, credentialId: number) {
  const credentialList = await credentialsRepository.findCredentialById(
    userId,
    credentialId
  );
  if (!credentialList) {
    throw {
      type: "unauthorized",
      message: `Wifi doesn't exist or don't belong to you`,
    };
  }
  return credentialList;
}

async function deleteCredential(credentialId: number) {
  await credentialsRepository.deleteCredentialById(credentialId);
}

export {
  createCredential,
  findAllCredentials,
  findCredentialById,
  deleteCredential,
};
