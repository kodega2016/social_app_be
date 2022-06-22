"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth_validation_1 = require("./../validations/auth.validation");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.route("/login").post(auth_validation_1.validateLogin, auth_controller_1.login);
router.route("/register").post(auth_validation_1.validateRegister, auth_controller_1.register);
router.route("/me").get(auth_middleware_1.protect, auth_controller_1.me);
router.route("/forgot-password").post(auth_controller_1.forgotPassword);
router.route("/reset-password/:token").post(auth_controller_1.resetPassword);
//# sourceMappingURL=auth.route.js.map