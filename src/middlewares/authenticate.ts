import { Request, Response, NextFunction } from "express";

import config from "@utils/config.js";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization !== config.authorization) {
    res.status(401).send({ message: "unauthorized" });
    return;
  }

  next();
};

export default authenticate;
