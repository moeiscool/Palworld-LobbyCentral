import "dotenv/config.js";

import logger, { Level } from "@utils/logger.js";
import config, { Environments } from "@utils/config";

import app from "./app.js";

const PORT: number | string = config.port ? Number(config.port) : 5780;

// starts the server
const startServer = async (): Promise<void> => {
  app.listen(PORT, () => logger(Level.INFO, `Server running on port ${PORT}`));
};

startServer()
  .then(async () => {
    if (config.environment === Environments.DEVELOPMENT) {
      const endpoints = (await import("express-list-endpoints")).default;
      console.log(endpoints(app));
    }
  })
  .catch((reason: any): void => {
    logger(Level.ERROR, reason);
    process.exit(1);
  });
