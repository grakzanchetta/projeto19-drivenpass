import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { credentialCreationSchema } from "../schemas/credentialSchema";
import { validateToken } from "../middlewares/tokenAuthenticator";
import * as credentialsController from "../controllers/credentialController";

const credentialsRouter = Router();

credentialsRouter.post(
  "/credentials",
  validateToken,
  validateSchema(credentialCreationSchema),
  credentialsController.createCredential
);

credentialsRouter.get(
  "/credentials",
  validateToken,
  credentialsController.findAllCredentials
);
credentialsRouter.get(
  "/credentials/:id",
  validateToken,
  credentialsController.findCredentialById
);
credentialsRouter.delete(
  "/credentials/:id",
  validateToken,
  credentialsController.deleteCredential
);

export default credentialsRouter;
