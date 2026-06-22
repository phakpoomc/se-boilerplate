import { Router } from "express";
import { sendOk } from "../../common/http/responses";

export const healthRouter = Router();

healthRouter.get("/", (_request, response) => {
  return sendOk(response, "API is healthy.", {
    service: "starter-api",
    checkedAt: new Date().toISOString()
  });
});
