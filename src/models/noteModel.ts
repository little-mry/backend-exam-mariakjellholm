import Datastore from "nedb-promises";
import { Note } from "../utils/interface.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '..', '..', 'db', 'users.db')
const notesDB = Datastore.create({
  filename: dbPath,
  autoload: true,
});

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
}

//Add a note to the database
export const addNote = async (newNote: Note):Promise<Note> => {
  const createdNote = await notesDB.insert(newNote);
  if (!createdNote) {
    throw new Error("Fel vid skapande av anteckning");
  }
  return createdNote;
}

//Changes an existing note
export const changeNote = async (noteId: string) => {
    
} 

//Delete a note from the database
export const deleteNote = async (noteId: string) => {
    
}

//Finds notes from the database, by a searchstring
export const findNotes = async (searchString: string) => {
    
}