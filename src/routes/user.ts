import { Router } from "express";
import { UserController } from "../controller/user-controller";

const router = Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.createUser);

router.patch("/:id", UserController.modifyUser);

router.delete("/:id", UserController.deleteUser);

export default router;
