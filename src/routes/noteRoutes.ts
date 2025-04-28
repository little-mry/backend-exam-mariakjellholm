import { Router } from "express";
import {
  getNotes,
  createNote,
  adjustNote,
  removeNote,
  searchNotes,
} from "../controllers/noteController.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { noteIdSchema, noteSchema, searchSchema } from "../middleware/joiValidation.js";

const router = Router();

router.get("/notes", auth, getNotes);
router.post("/notes", auth, validate(noteSchema, "body"), createNote);
router.patch(
  "/notes/:_id",
  auth,
  validate(noteIdSchema, "params"),
  validate(noteSchema, "body"),
  adjustNote
);
router.delete(
  "/notes/:_id",
  auth,
  validate(noteIdSchema, "params"),
  removeNote
);
router.get("/notes/search", auth, validate(searchSchema, "query"), searchNotes);

export default router;
