import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { noteCreationSchema } from "../schemas/noteSchema";
import * as noteController from "../controllers/noteController";
import { validateToken } from "../middlewares/tokenAuthenticator";

const notesRouter = Router();

notesRouter.post(
  "/notes",
  validateToken,
  validateSchema(noteCreationSchema),
  noteController.createNote
);

notesRouter.get("/notes", validateToken, noteController.findAllNotes);
notesRouter.get("/notes/:id", validateToken, noteController.findNoteById);
notesRouter.delete("/notes/:id", validateToken, noteController.deleteNote);

export default notesRouter;
