import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { wifiCreationSchema } from "../schemas/wifiSchema";
import * as wifiController from "../controllers/wifiController";
import { validateToken } from "../middlewares/tokenAuthenticator";

const wifiRouter = Router();

wifiRouter.post(
  "/wifi",
  validateToken,
  validateSchema(wifiCreationSchema),
  wifiController.createWifi
);

wifiRouter.get("/wifi", validateToken, wifiController.findAllWifi);
wifiRouter.get("/wifi/:id", validateToken, wifiController.findWifiById);
wifiRouter.delete("/wifi/:id", validateToken, wifiController.deleteWifi);

export default wifiRouter;
