import express, { Express, Request, Response } from "express";
import cors from "cors";

import httpLogger from "@middlewares/httpLogger.js";
import errorHandler from "@middlewares/errorHandler.js";
import rateLimit from "@middlewares/rateLimit.js";
import authenticate from "@middlewares/authenticate.js";

import serverRouter from "@routes/serverRouter.js";

const app: Express = express();

app.use(httpLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"], // Allowed headers
  })
);

app.use(rateLimit);
app.use(authenticate);

app.use("server", serverRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).send({ message: "Resource Not Found" });
});

app.use(errorHandler);

export default app;
