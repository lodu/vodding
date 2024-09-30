import { Router } from "express";
import streamRouter from "./streamRoutes";

const router = Router();

// router.use("/twitch", twitchRouter);
router.use("/stream", streamRouter);

export default router;
