"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var priority_controller_1 = require("../controller/priority-controller");
var router = (0, express_1.Router)();
router.get("/", priority_controller_1.default.getAll);
router.patch("/:id", priority_controller_1.default.modifyPriority);
exports.default = router;
//# sourceMappingURL=priority.js.map