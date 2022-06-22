"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.authRoutes);
exports.default = router;
//# sourceMappingURL=routes.js.map