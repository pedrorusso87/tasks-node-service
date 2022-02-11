import { Router } from "express";
import StatusController from "../controller/status-controller";
var router = Router();
router.get("/", StatusController.getAll);
router.patch("/:id", StatusController.modifyStatus);
router.post("/", StatusController.addStatus);
export default router;
//# sourceMappingURL=status.js.map