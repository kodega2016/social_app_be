"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const fileUpload_middleware_1 = __importDefault(require("../middleware/fileUpload.middleware"));
const post_controller_2 = require("./../controllers/post.controller");
const router = (0, express_1.Router)();
exports.postRoutes = router;
router.route("/").get(post_controller_1.index).post(auth_middleware_1.protect, (0, fileUpload_middleware_1.default)("posts"), post_controller_1.save);
router
    .route("/:id")
    .get(post_controller_2.show)
    .put(auth_middleware_1.protect, (0, fileUpload_middleware_1.default)("posts"), post_controller_1.update)
    .delete(auth_middleware_1.protect, post_controller_1.destroy);
//# sourceMappingURL=post.route.js.map