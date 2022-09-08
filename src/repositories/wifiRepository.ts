import prisma from "../database/database";
import * as types from "../interfaces/interfaces";

async function insertWifi(userId: number, wifiData: types.CreateWifi) {
  const noteInfo = {
    userId,
    ...wifiData,
  };
  return await prisma.wifi.create({
    data: noteInfo,
  });
}

async function findAllWifiByUserId(userId: number) {
  return await prisma.wifi.findMany({
    where: {
      userId,
    },
  });
}

async function findWifiById(userId: number, id: number) {
  return await prisma.wifi.findFirst({
    where: {
      userId,
      id,
    },
  });
}

async function deleteWifiById(id: number) {
  return await prisma.wifi.delete({
    where: {
      id,
    },
  });
}

export { insertWifi, findAllWifiByUserId, findWifiById, deleteWifiById };
