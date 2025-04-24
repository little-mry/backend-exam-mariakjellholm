import { Router } from "express";
import { getNotes, createNote, adjustNote, removeNote, searchNotes } from "../controllers/noteContoller.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { noteSchema } from "../middleware/joiValidation.js";

const router = Router();

router.get('/notes', getNotes)
router.post('/notes', createNote)
router.put('/notes', adjustNote)
router.delete('/notes', removeNote)
router.get('/notes/search', searchNotes)

export default router