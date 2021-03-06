import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import { uploadMiddleware } from "../middlewares/upload";
import * as postController from "../controllers/post";
import * as commentController from "../controllers/comment";
import * as yallyController from "../controllers/yally";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.fields([
    { name: "img", maxCount: 1 },
    { name: "sound", maxCount: 1 },
  ]),
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
  "/comment/:id",
  authMiddleware,
  tryCatchMiddleware.Error(commentController.deleteComment)
);

router.get(
  "/yally/:id",
  authMiddleware,
  tryCatchMiddleware.Error(yallyController.addYally)
);

router.delete(
  "/yally/:id",
  authMiddleware,
  tryCatchMiddleware.Error(yallyController.calcelYally)
);

router.delete(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.Error(postController.deleteOne)
);

router.put(
  "/:id",
  authMiddleware,
  uploadMiddleware.fields([
    { name: "img", maxCount: 1 },
    { name: "sound", maxCount: 1 },
  ]),
  tryCatchMiddleware.Error(postController.updateOne)
);

export default router;
