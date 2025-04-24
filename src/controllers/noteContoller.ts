import {
  fetchNotes,
  addNote,
  changeNote,
  deleteNote,
  findNotes,
} from "../models/noteModel.js";
import { RequestHandler } from "express";

//Get all notes by userId
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const userNotes = await fetchNotes(userId);

    res.status(200).json({
      success: true,
      message: "Hämtning av anteckningar lyckades",
      data: userNotes,
    });
  } catch (error) {
    console.error("Fel vid hämtning av anteckningar", error);
    res.status(500).json({ error: "Fel vid hämtning av anteckningar" });
  }
};

//Create a new note
export const createNote: RequestHandler = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

//Change an existing note
export const adjustNote: RequestHandler = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

//Delete a note
export const removeNote: RequestHandler = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

//Search notes
export const searchNotes: RequestHandler = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}
