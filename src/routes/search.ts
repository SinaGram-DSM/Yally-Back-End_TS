import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import * as controller from "../controllers/search";

const router = Router();

router.get(
  "/post",
  authMiddleware,
  tryCatchMiddleware.Error(controller.searchPost)
);

export default router;
