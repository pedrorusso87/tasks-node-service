"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth");
var user_1 = require("./user");
var priority_1 = require("./priority");
var status_1 = require("./status");
var task_1 = require("./task");
var dashboard_1 = require("./dashboard");
var routes = (0, express_1.Router)();
routes.use("/auth", auth_1.default);
routes.use("/users", user_1.default);
routes.use("/priorities", priority_1.default);
routes.use("/status", status_1.default);
routes.use("/tasks", task_1.default);
routes.use("/dashboards", dashboard_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map