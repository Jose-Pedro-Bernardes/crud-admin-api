import { ErrorRequestHandler } from "express";
import "express-async-errors";

import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.statusCode = status;
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json(err.flatten().fieldErrors);
  }

  return res.status(500).json({ message: "Server internal error!" });
};

export { AppError, errorHandler };
