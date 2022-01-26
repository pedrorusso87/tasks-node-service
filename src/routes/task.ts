import { Router } from "express";
import TaskController from "../controller/task-controller";

const router = Router();

router.get("/", TaskController.getAll);

router.post("/", TaskController.createTask);

export default router;
