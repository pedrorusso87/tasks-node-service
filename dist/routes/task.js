"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var task_controller_1 = require("../controller/task-controller");
var router = (0, express_1.Router)();
router.get("/", task_controller_1.default.getAll);
router.get("/:id", task_controller_1.default.getTasksByDashboardId);
router.post("/", task_controller_1.default.createTask);
router.patch("/:id", task_controller_1.default.updateTask);
router.delete("/:id", task_controller_1.default.deleteTask);
exports.default = router;
//# sourceMappingURL=task.js.map