import { Request, Response } from "express";
import * as wifiServices from "../services/wifiServices";
import * as encryptServices from "../utils/encryptServices";

async function createWifi(req: Request, res: Response) {
  const wifi = req.body;
  const { user } = res.locals;
  await wifiServices.createWifi(user.userId, wifi);

  res
    .status(201)
    .send(
      `The following wifi has been registered sucessfully: ${wifi.wifiTag}`
    );
}

async function findAllWifi(req: Request, res: Response) {
  const { user } = res.locals;
  const wifiList = await wifiServices.findAllWifi(user.userId);

  for (let i = 0; i < wifiList.length; i++) {
    wifiList[i].password = encryptServices.decryptData(wifiList[i].password);
  }

  res.status(201).send(wifiList);
}

async function findWifiById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  const wifiList = await wifiServices.findWifiById(user.userId, id);
  wifiList.password = encryptServices.decryptData(wifiList.password);

  res.status(201).send(wifiList);
}

async function deleteWifi(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  await wifiServices.findWifiById(user.userId, id);
  await wifiServices.deleteWifi(id);

  res.status(201).send(`Wifi with id ${id} has been removed!`);
}

export { createWifi, findAllWifi, findWifiById, deleteWifi };
