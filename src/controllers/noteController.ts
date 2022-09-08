import { Request, Response } from "express";
import * as noteServices from "../services/notesServices";

async function createNote(req: Request, res: Response) {
  const note = req.body;
  const { user } = res.locals;
  await noteServices.createNote(user.userId, note);

  res
    .status(201)
    .send(
      `The following note has been registered sucessfully: ${note.noteTag}`
    );
}

async function findAllNotes(req: Request, res: Response) {
  const { user } = res.locals;
  const notesList = await noteServices.findAllNotes(user.userId);

  res.status(201).send(notesList);
}

async function findNoteById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  const cardList = await noteServices.findNoteById(user.userId, id);

  res.status(201).send(cardList);
}

async function deleteNote(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  await noteServices.findNoteById(user.userId, id);
  await noteServices.deleteNote(id);

  res.status(201).send(`Note with id ${id} has been removed!`);
}

export { createNote, findAllNotes, findNoteById, deleteNote };
