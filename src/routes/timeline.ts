import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import * as controller from "../controllers/timeline";

const router = Router();

router.get(
  "/:page",
  authMiddleware,
  tryCatchMiddleware.Error(controller.getTimeline)
);

export default router;