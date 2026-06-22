import type { Response } from "express";
import { fail, ok } from "@starter/shared";

export function sendOk<TData>(response: Response, message: string, data: TData, code = 200) {
  return response.status(code).json(ok(message, data, code));
}

export function sendError(response: Response, message: string, code = 500, errors?: unknown) {
  return response.status(code).json(fail(message, code, errors));
}
