import { Router } from "express";
import PriorityController from "../controller/priority-controller";

const router = Router();

router.get("/", PriorityController.getAll);

/*TODO: check if we really want to expose this endpoint

router.patch("/:id", PriorityController.modifyPriority);*/

export default router;
