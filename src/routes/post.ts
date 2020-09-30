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

router.get(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.Error(controller.detailPost)
);

router.get(
  "/:id/comment",
  authMiddleware,
  tryCatchMiddleware.Error(controller.showComment)
);

export default router;
