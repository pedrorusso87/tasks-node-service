import { Router } from "express";
import DashboardController from "../controller/dashboard-controller";
import { DashboardUsersController } from "../controller/dashboards-users.controller";

const router = Router();

router.get("/", DashboardController.getAll);
router.get("/:id", DashboardController.getDashboardById);
router.get("/username/:username", DashboardUsersController.getDashboardsByUsername);

export default router;
