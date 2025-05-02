import {
  fetchNotes,
  addNote,
  deleteNote,
  findNotes,
  updateNoteById,
} from "../models/noteModel.js";
import { RequestHandler } from "express";
import { Note } from "../utils/interface.js";
import { v4 as uuidv4 } from "uuid";


//Get all notes by userId
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userNotes = await fetchNotes(id);

    res.status(200).json({
      success: true,
      message: "Lyckad hämtning av anteckningar",
      data: userNotes,
    });
    return;
  } catch (error) {
    console.error("Fel vid hämtning av anteckningar", error);
    res.status(500).json({ error: "Fel vid hämtning av anteckningar" });
  }
};

//Create a new note
export const createNote: RequestHandler = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const { id } = req.user;

    const newNote: Note = {
      title,
      text,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      _id: uuidv4(),
      userId: id,
    };
    const createdNote = await addNote(newNote);

    res.status(201).json({
      success: true,
      message: "Anteckning skapad",
      data: createdNote,
    });
    return;
  } catch (error) {
    console.error("Fel vid skapande av anteckning", error);
    res.status(500).json({ error: "Fel vid skapande av anteckning" });
  }
};

//Change an existing note
export const adjustNote: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { title, text } = req.body;
    const { id } = req.user;

    const adjustedNote = await updateNoteById(_id, id, { title, text });

    if (!adjustedNote) {
      res.status(404).json({
        success: false,
        message:
          "Ingen anteckning hittades med det här id:t för den inloggade användaren.",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Anteckning uppdaterad",
      data: adjustedNote,
    });
    return;
  } catch (error) {
    console.error("Fel vid uppdatering av anteckning", error);
    res.status(500).json({ error: "Fel vid uppdatering av anteckning" });
  }
};

//Delete a note
export const removeNote: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { id } = req.user;

    const numRemoved = await deleteNote(_id, id);
    if (numRemoved === 0) {
      res.status(404).json({ error: "Ingen anteckning har raderats" });
      return;
    }

    res.set("X-Message", "Note successfully removed").sendStatus(204);
  } catch (error) {
    console.error("Fel vid borttagning av anteckning", error);
    res.status(500).json({ error: "Fel vid borttagning av anteckning" });
  }
};

//Search notes
export const searchNotes: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { q } = req.query;
    let searchTerm: string;

    if (typeof q === "string") {
      searchTerm = q;
    } else if (Array.isArray(q) && typeof q[0] === "string") {
      searchTerm = q[0];
    } else {
      searchTerm = "";
    }

    const foundNotes = await findNotes(id, searchTerm);
    if (foundNotes.length === 0) {
      res.status(404).json({ error: "Inga anteckningar hittades" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Sökningen lyckades",
      data: foundNotes,
    });
  } catch (error) {
    console.error("Fel vid sökning", error);
    res.status(500).json({ error: "Fel vid sökning" });
  }
};
