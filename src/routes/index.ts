import express from "express";

const router = express.Router();

router.get("/health", (_, res) => res.sendStatus(200));

export default router;
