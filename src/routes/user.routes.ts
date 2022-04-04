import express from "express";

const router = express.Router();

router.post("/user", (_, res) => res.sendStatus(200));

export default router;
