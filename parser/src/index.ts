import { getLogger } from "./utils/logging";
import { configureAppServer } from "./server";

const logger = getLogger(__filename);

configureAppServer().then(() =>
  logger.info("App Server Initialized Successfully!")
);
