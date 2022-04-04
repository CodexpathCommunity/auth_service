import express from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../shema/user.schema";

const router = express.Router();

router.post("/user", validateResource(createUserSchema), createUserHandler);

export default router;
