import * as wifiRepository from "../repositories/wifiRepository";
import * as types from "../interfaces/interfaces";
import * as encryptServices from "../utils/encryptServices";

async function createWifi(userId: number, wifiData: types.CreateWifi) {
  const hashPassword = encryptServices.encryptData(wifiData.password);

  await wifiRepository.insertWifi(userId, {
    ...wifiData,
    password: hashPassword,
  });
}

async function findAllWifi(userId: number) {
  const wifiList = await wifiRepository.findAllWifiByUserId(userId);
  return wifiList;
}

async function findWifiById(userId: number, wifiId: number) {
  const wifiList = await wifiRepository.findWifiById(userId, wifiId);
  if (!wifiList) {
    throw {
      type: "unauthorized",
      message: `Wifi doesn't exist or don't belong to you`,
    };
  }
  return wifiList;
}

async function deleteWifi(wifiId: number) {
  await wifiRepository.deleteWifiById(wifiId);
}

export { createWifi, findAllWifi, findWifiById, deleteWifi };
