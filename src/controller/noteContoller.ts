import {
  fetchNotes,
  addNote,
  changeNote,
  deleteNote,
  findNotes,
} from "../models/noteModel.js";
import { Request, Response } from "express";

//Get all notes by userId
export const getNotes = async (req: Request, res: Response) => {
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
export const createNote = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

//Change an existing note
export const adjustNote = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

//Delete a note
export const removeNote = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

//Search notes
export const searchNotes = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}
