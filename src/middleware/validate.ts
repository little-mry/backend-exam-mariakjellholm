import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

const validate = (schema: Schema, property: "body" | "query" | "params") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};

export default validate;
