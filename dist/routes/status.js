"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var status_controller_1 = require("../controller/status-controller");
var router = (0, express_1.Router)();
router.get("/", status_controller_1.default.getAll);
router.patch("/:id", status_controller_1.default.modifyStatus);
router.post("/", status_controller_1.default.addStatus);
exports.default = router;
//# sourceMappingURL=status.js.map