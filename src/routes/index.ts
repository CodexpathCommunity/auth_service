import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";

const router = express.Router();

router.get("/health", (_, res) => res.sendStatus(200));
//make /api/v1 base path for router
router.use(user);
router.use(auth);

export default router;
