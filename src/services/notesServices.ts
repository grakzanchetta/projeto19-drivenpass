import * as noteRepository from "../repositories/notesRepository";
import * as types from "../interfaces/interfaces";

async function createNote(userId: number, noteData: types.CreateNote) {
  const existingTag = await noteRepository.findTagAndUser(
    userId,
    noteData.noteTag
  );
  if (existingTag) {
    throw {
      type: "conflict",
      message: `Note with the Tag ${noteData.noteTag} already registered`,
    };
  }

  if (noteData.noteTag.length > 50 || noteData.text.length > 1000) {
    throw {
      type: "bad_request",
      message: `Title or text too Long!`,
    };
  }
  await noteRepository.insertNote(userId, noteData);
}

async function findAllNotes(userId: number) {
  const notesList = await noteRepository.findAllNotesByUserId(userId);
  return notesList;
}

async function findNoteById(userId: number, noteId: number) {
  const notesList = await noteRepository.findNotesById(userId, noteId);
  if (!notesList) {
    throw {
      type: "unauthorized",
      message: `Note doesn't exist or don't belong to you`,
    };
  }
  return notesList;
}

async function deleteNote(noteId: number) {
  await noteRepository.deleteNoteById(noteId);
}

export { createNote, findAllNotes, findNoteById, deleteNote };
