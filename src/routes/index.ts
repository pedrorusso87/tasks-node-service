import { Router } from "express";
import auth from "./auth";
import user from "./User";
import priorities from "./priority";
import status from "./status";
import tasks from "./task";
import dashboards from "./dashboard";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/priorities", priorities);
routes.use("/status", status);
routes.use("/tasks", tasks);
routes.use("/dashboards", dashboards);

export default routes;
