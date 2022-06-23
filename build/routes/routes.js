"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
const post_route_1 = require("./post.route");
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.authRoutes);
router.use("/posts", post_route_1.postRoutes);
exports.default = router;
//# sourceMappingURL=routes.js.map