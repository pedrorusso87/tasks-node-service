import { Router } from "express";
import DashboardController from "../controller/dashboard-controller";

const router = Router();

router.get("/", DashboardController.getAll);

export default router;
