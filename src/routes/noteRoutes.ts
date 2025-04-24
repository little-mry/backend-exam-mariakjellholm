import { Router } from "express";
import { getNotes, createNote, adjustNote, removeNote, searchNotes } from "../controllers/noteContoller.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { noteSchema } from "../middleware/joiValidation.js";

const router = Router();

router.get('/notes')
router.post('/notes' )
router.put('/notes' )
router.delete('/notes')
router.get('/notes/search')

export default router