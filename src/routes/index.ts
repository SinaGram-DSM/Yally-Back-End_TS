import { Router } from "express";
import post from "./post";
import timeline from "./timeline";

const router = Router();

router.use("/post", post);
router.use("/timeline", timeline);

export default router;
