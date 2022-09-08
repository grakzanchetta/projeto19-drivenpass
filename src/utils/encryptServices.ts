import bcrypt from "bcrypt";
import Cryptr from "cryptr";

const cryptr = new Cryptr(String(process.env.CRYPTR_SECRET_KEY));

function encryptMasterPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}

function encryptData(data: string) {
  const encryptedString = cryptr.encrypt(data);
  return encryptedString;
}

function decryptData(encryptedString: string) {
  const decryptedString = cryptr.decrypt(encryptedString);
  return decryptedString;
}

export { encryptMasterPassword, encryptData, decryptData };
