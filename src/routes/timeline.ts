import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import * as controller from "../controllers/timeline";

const router = Router();

router.get(
  "/friend",
  authMiddleware,
  tryCatchMiddleware.Error(controller.recommendFriends)
);

router.get(
  "/:page",
  authMiddleware,
  tryCatchMiddleware.Error(controller.getTimeline)
);

router.get("/", authMiddleware, tryCatchMiddleware.Error(controller.showInfo));

export default router;
