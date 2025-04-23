import { Router } from "express";
import { getNotes, createNote, adjustNote, removeNote, searchNotes } from "../controller/noteContoller.js";

const router = Router();

router.get('/notes')
router.post('/notes')
router.put('/notes')
router.delete('/notes')
router.get('/notes/search')

export default router