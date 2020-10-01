import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import { uploadMiddleware } from "../middlewares/upload";
import * as postController from "../controllers/post";
import * as commentController from "../controllers/comment";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  tryCatchMiddleware.Error(postController.writeOne)
);

router.get(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.Error(postController.detailPost)
);

router.get(
  "/:id/comment",
  authMiddleware,
  tryCatchMiddleware.Error(postController.showComment)
);

router.post(
  "/comment/:id",
  authMiddleware,
  uploadMiddleware.single("file"),
  tryCatchMiddleware.Error(commentController.writeComment)
);

router.delete(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.Error(postController.deleteOne)
);

router.put(
  "/:id",
  authMiddleware,
  uploadMiddleware.single("file"),
  tryCatchMiddleware.Error(postController.updateOne)
);

export default router;
