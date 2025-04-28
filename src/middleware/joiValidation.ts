import joi from "joi";

export const userSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Ogiltigt e-postformat.",
    "any.required": "E-post är obligatoriskt.",
  }),
  password: joi.string().min(6).required().messages({
    "string.min": "Lösenordet måste vara minst 6 tecken långt.",
    "any.required": "Lösenordet är obligatoriskt.",
  }),
});

export const noteSchema = joi.object({
  title: joi.string().min(2).max(50).required().messages({
    "string.min": "Titeln måste vara minst 2 tecken lång.",
    "string.max": "Titeln får max vara 50 tecken lång.",
    "any.required": "Titel är obligatoriskt.",
  }),
  text: joi.string().min(2).max(300).required().messages({
    "string.min": "Anteckningen måste vara minst 2 tecken lång.",
    "string.max": "Anteckningen får max vara 50 tecken lång.",
    "any.required": "Anteckning är obligatoriskt.",
  }),
});

export const noteUpdateSchema = joi.object({
  title: joi.string().allow("").optional(),
  text : joi.string().allow("").optional(),
})
.or("title", "text")

export const noteIdSchema = joi.object({
  _id: joi
    .string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "Id:t måste vara en sträng.",
      "string.guid": "Ogiltigt format, förväntas ett giltigt UUID.",
      "any.required": "Id:t är obligatoriskt.",
    }),
});

export const searchSchema = joi.object({
  q: joi.string().trim().min(1).required().messages({
    "string.empty": "Sökningen får inte vara tom.",
    "string.min": "Sökningen måste vara bestå av minst 1 tecken.",
  }),
});
