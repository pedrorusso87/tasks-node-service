import { Router } from "express";
import PriorityController from "../controller/priority-controller";
var router = Router();
router.get("/", PriorityController.getAll);
router.patch("/:id", PriorityController.modifyPriority);
export default router;
//# sourceMappingURL=priority.js.map