import { Router } from "express";
import StatusController from "../controller/status-controller";

const router = Router();

router.get("/", StatusController.getAll);

router.patch("/:id", StatusController.modifyStatus);

export default router;