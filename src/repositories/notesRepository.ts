import prisma from "../database/database";
import * as types from "../interfaces/interfaces";

async function insertNote(userId: number, noteData: types.CreateNote) {
  const noteInfo = {
    userId,
    ...noteData,
  };
  return await prisma.notes.create({
    data: noteInfo,
  });
}

async function findTagAndUser(userId: number, noteTag: string) {
  return await prisma.notes.findFirst({
    where: {
      userId,
      noteTag,
    },
  });
}

async function findAllNotesByUserId(userId: number) {
  return await prisma.notes.findMany({
    where: {
      userId,
    },
  });
}

async function findNotesById(userId: number, id: number) {
  return await prisma.notes.findFirst({
    where: {
      userId,
      id,
    },
  });
}

async function deleteNoteById(id: number) {
  return await prisma.notes.delete({
    where: {
      id,
    },
  });
}

export {
  insertNote,
  findTagAndUser,
  findAllNotesByUserId,
  findNotesById,
  deleteNoteById,
};
