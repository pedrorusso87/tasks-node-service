"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dashboard_controller_1 = require("../controller/dashboard-controller");
var dashboards_users_controller_1 = require("../controller/dashboards-users.controller");
var router = (0, express_1.Router)();
router.get("/", dashboard_controller_1.default.getAll);
router.get("/:id", dashboard_controller_1.default.getDashboardById);
router.get("/user/:id", dashboards_users_controller_1.DashboardUsersController.getDashboardsByUserId);
exports.default = router;
//# sourceMappingURL=dashboard.js.map