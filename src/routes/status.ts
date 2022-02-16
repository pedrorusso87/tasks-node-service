import { Router } from "express";
import StatusController from "../controller/status-controller";

const router = Router();

router.get("/", StatusController.getAll);

/*TODO: check if we really want to expose these endpoints
router.patch("/:id", StatusController.modifyStatus);

router.post("/", StatusController.addStatus); */

export default router;
