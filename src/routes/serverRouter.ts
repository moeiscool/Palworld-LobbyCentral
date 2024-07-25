import { Router } from "express";

import { createServer, deleteServer, getServers, updateServer } from "@controllers/serverController";

const serverRouter = Router();

serverRouter.get("/", getServers);
serverRouter.post("/create", createServer);
serverRouter.post("/update/:id", updateServer);
serverRouter.post("/delete/:id", deleteServer);

export default serverRouter;
