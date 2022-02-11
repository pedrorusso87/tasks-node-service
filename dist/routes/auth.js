import { Router } from "express";
import AuthController from "../controller/auth-controller";
var router = Router();
router.post("/login", AuthController.login);
export default router;
//# sourceMappingURL=auth.js.map