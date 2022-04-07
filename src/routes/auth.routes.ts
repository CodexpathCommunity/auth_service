import express from "express";
import validateResource from "../middlewares/validateResource";
import { createSessionSchema } from "../shema/auth.schema";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controller/auth.controller";

const router = express.Router();

router.post(
  "/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);

router.post("/session/refresh", refreshAccessTokenHandler);

export default router;
