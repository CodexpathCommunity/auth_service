import express from "express";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../shema/user.schema";

const router = express.Router();

router.post("/user", validateResource(createUserSchema), (req, res) =>
  res.sendStatus(200)
);

export default router;
