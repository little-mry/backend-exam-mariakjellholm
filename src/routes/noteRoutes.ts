import { Router } from "express";
import { getNotes, createNote, adjustNote, removeNote, searchNotes } from "../controllers/noteController.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { noteSchema } from "../middleware/joiValidation.js";

const router = Router();

router.get('/notes', auth, getNotes)
router.post('/notes', auth, validate(noteSchema, 'body'), createNote)
router.put('/notes', auth, validate(noteSchema, 'body'), adjustNote)
router.delete('/notes', auth, validate(noteSchema, 'params'), removeNote)
router.get('/notes/search', auth, validate(noteSchema, 'query'), searchNotes)

export default router