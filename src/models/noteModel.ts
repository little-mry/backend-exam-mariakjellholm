import Datastore from "nedb-promises";
import type Nedb from "nedb-promises";
import { DBNote, Note } from "../utils/interface.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "..", "..", "db", "notes.db");
const rawDB = Datastore.create({
  filename: dbPath,
  autoload: true,
});

const notesDB = rawDB as Nedb<DBNote>;

//Fetch all notes by userId
export const fetchNotes = async (userId: string): Promise<Note[]> => {
  try {
    const notes: Note[] = await notesDB.find({ userId });
    if (notes.length === 0) {
      throw new Error("Inga anteckningar hittades för användaren.");
    }
    return notes;
  } catch (error) {
    console.error("Fel vid hämtning av anteckningar", error);
    throw new Error("Fel vid hämtning av anteckningar");
  }
};

//Add a note to the database
export const addNote = async (newNote: Note): Promise<Note> => {
  const createdNote = await notesDB.insert(newNote);
  if (!createdNote) {
    throw new Error("Fel vid skapande av anteckning");
  }
  return createdNote;
};

//Changes an existing note
export const updateNoteById = async (
  noteId: string,
  userId: string,
  updates: { title: string; text: string }
): Promise<DBNote | null> => {
  const findNote = await notesDB.findOne({ _id: noteId, userId: userId });
  if (!findNote) {
    return null;
  }

  const modifiedAt = new Date().toISOString();

  const changeNote = await notesDB.update(
    { _id: noteId, userId },
    { $set: { ...updates, modifiedAt } },
    { returnUpdatedDocs: true }
  );
  if (!changeNote) {
    throw new Error("Fel vid skapande av anteckning");
  }
  return changeNote || null;
};

//Delete a note from the database
export const deleteNote = async (noteId: string, userId: string) => {
  const numDeleted = await notesDB.remove(
    { _id: noteId, userId },
    { multi: false }
  );

  return numDeleted;
};

//Finds notes from the database, by a searchstring
export const findNotes = async (searchString: string): Promise<DBNote[]> => {
  const foundNotes = await notesDB.find({
    $or: [
      { title: { $regex: new RegExp(searchString, "i") } },
      { text: { $regex: new RegExp(searchString, "i") } },
    ],
  });

  return foundNotes;
};
