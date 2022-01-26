import { Router } from "express";
import TaskController from "../controller/task-controller";

const router = Router();

router.get("/", TaskController.getAll);

router.post("/", TaskController.createTask);

router.patch("/:id", TaskController.updateTask);

export default router;
