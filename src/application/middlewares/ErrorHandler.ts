import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  console.error(error.stack);
  response.status(500).json({ error: 'Internal Server Error' });
  next();
}