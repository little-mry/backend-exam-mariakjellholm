import {
  fetchNotes,
  addNote,
  changeNote,
  deleteNote,
  findNotes,
} from "../models/noteModel.js";
import { RequestHandler } from "express";
import { Note } from "../utils/interface.js";

//Get all notes by userId
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userNotes = await fetchNotes(id);

    res.status(200).json({
      success: true,
      message: "Hämtning av anteckningar lyckades",
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
      ...req.body,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
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
  } catch (error) {}
};

//Delete a note
export const removeNote: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

//Search notes
export const searchNotes: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};
