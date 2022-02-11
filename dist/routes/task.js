import { Router } from "express";
import TaskController from "../controller/task-controller";
var router = Router();
router.get("/", TaskController.getAll);
router.get("/:id", TaskController.getTasksByDashboardId);
router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);
export default router;
//# sourceMappingURL=task.js.map