import express from "express";
import {
  createUserHandler,
  verifyUserHandler,
} from "../controller/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema, verifyUserSchema } from "../shema/user.schema";

const router = express.Router();

router.post("/user", validateResource(createUserSchema), createUserHandler);
router.post(
  "/user/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

export default router;
