import { Router } from "express";
import auth from "./auth";
import user from "./user";
import priorities from "./priority";
import status from "./status";
import tasks from "./task";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/priorities", priorities);
routes.use("/status", status);
routes.use("/tasks", tasks);

export default routes;
