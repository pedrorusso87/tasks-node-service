"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controller/user-controller");
var router = (0, express_1.Router)();
router.get("/", user_controller_1.UserController.getAll);
router.get("/:id", user_controller_1.UserController.getUserById);
router.post("/", user_controller_1.UserController.createUser);
router.patch("/:id", user_controller_1.UserController.modifyUser);
router.delete("/:id", user_controller_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map