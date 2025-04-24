import Datastore from "nedb-promises";

const notesDB = Datastore.create({
  filename: "../db/notes.db",
  autoload: true,
});

//Fetch all notes by userId
export const fetchNotes = async (userId: string) => {
    
}

//Add a note to the database
export const addNote = async (note: object) => {

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