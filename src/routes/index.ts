import { Router } from "express";
import post from "./post";
import timeline from "./timeline";
import search from "./search";

const router = Router();

router.use("/post", post);
router.use("/timeline", timeline);
router.use("/search", search);

export default router;
