import { Router } from "express";
import DashboardController from "../controller/dashboard-controller";
import { DashboardUsersController } from "../controller/dashboards-users.controller";
var router = Router();
router.get("/", DashboardController.getAll);
router.get("/:id", DashboardController.getDashboardById);
router.get("/user/:id", DashboardUsersController.getDashboardsByUserId);
export default router;
//# sourceMappingURL=dashboard.js.map