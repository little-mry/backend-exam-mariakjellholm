import { Schema } from "joi";
import { RequestHandler } from "express";

const validate = (schema: Schema, property: "body" | "query" | "params"): RequestHandler => {
  return (req, res, next): void => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(400).json({ errors });
      return 
    }
    next();
  };
};

export default validate;
