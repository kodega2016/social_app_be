import { Router } from "express";
import {
  forgotPassword,
  login,
  me,
  register,
  resetPassword,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import {
  validateLogin,
  validateRegister,
} from "./../validations/auth.validation";
const router: Router = Router();

router.route("/login").post(validateLogin, login);
router.route("/register").post(validateRegister, register);
router.route("/me").get(protect, me);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export { router as authRoutes };
