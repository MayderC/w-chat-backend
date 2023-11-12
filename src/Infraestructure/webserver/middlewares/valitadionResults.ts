import { validationResult, ValidationError } from "express-validator";
import { Request, Response } from "express";

export const validations = (req: Request, res: Response, next: Function) => {
  const errorFormatter = ({ location, msg, param }: ValidationError) => {
    return `${location}[${param}]: ${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }
  next()
};
