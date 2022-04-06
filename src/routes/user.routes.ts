import express from "express";
import {
  createUserHandler,
  verifyUserHandler,
} from "../controller/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema, verifyUserSchema } from "../shema/user.schema";

const router = express.Router();

//create a new user first validates request and parse request body if valid else reject
router.post("/user", validateResource(createUserSchema), createUserHandler);

//veryfy user email verifies user emails by posting validation data sent to email
router.post(
  "/user/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

export default router;
