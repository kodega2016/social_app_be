import { Router } from "express";
import {
  forgotPassword,
  login,
  me,
  register,
  resetPassword,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
const router: Router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/me").get(protect, me);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export { router as authRoutes };
