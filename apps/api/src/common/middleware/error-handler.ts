import type { ErrorRequestHandler } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { ApiError } from "../http/api-error";
import { sendError } from "../http/responses";

export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof ZodError) {
    return sendError(response, "The request data is invalid.", 400, error.flatten());
  }

  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return sendError(response, "The uploaded file is larger than the configured limit.", 413);
  }

  if (error instanceof ApiError) {
    return sendError(response, error.message, error.statusCode, error.errors);
  }

  console.error(`[${request.method}] ${request.originalUrl}`, error);
  return sendError(response, "The server could not complete the request.", 500);
};
