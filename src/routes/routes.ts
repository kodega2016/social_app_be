import { Router } from "express";
import { authRoutes } from "./auth.route";
import { postRoutes } from "./post.route";
const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;
