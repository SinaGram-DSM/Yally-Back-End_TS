import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import { uploadMiddleware } from "../middlewares/upload";
import * as controller from "../controllers/post";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  tryCatchMiddleware.Error(controller.writeOne)
);

export default router;
