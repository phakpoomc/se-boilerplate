import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

interface RequestSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export function validateRequest(schemas: RequestSchemas) {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }
    if (schemas.params) {
      request.params = schemas.params.parse(request.params) as Request["params"];
    }
    if (schemas.query) {
      Object.defineProperty(request, "query", {
        value: schemas.query.parse(request.query),
        configurable: true,
        enumerable: true
      });
    }
    next();
  };
}
