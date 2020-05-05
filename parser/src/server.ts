import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import { getLogger } from "./utils/logging";
import RecoveryFileParser from "./components/parser";

const logger = getLogger(__filename);

const recoveryFileParser: RecoveryFileParser = new RecoveryFileParser();

const handleParseRequest = async (
  req: express.Request,
  res: express.Response
) => {
  res.json(await recoveryFileParser.extractInfo("data/TW450631_Snapshot.txt"));
};

const configureApp = async () => {
  const app = express();

  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());
  app.use(
    morgan("dev", {
      stream: {
        write: message =>
          logger.info(
            message.replace(/\n$/, "")
            // .replace(/\s-\s\[.*\]/, "")
          )
      }
    })
  );
  const router = express.Router();

  router.get("/parse/", handleParseRequest);

  app.use("/", router);

  return app;
};

const normalizePort = (val: number | string) => {
  const port = typeof val === "string" ? parseInt(val, 10) : val;
  if (!port) return val;
  else if (port >= 0) return port;
  return false;
};

const onError = (error: any, port: string | number) => {
  logger.info(error);
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    case "EADDRNOTAVAIL":
      logger.error("Host address not available");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export const configureAppServer = async () => {
  const app = await configureApp();
  const server = http.createServer(app);
  const port = <string | number>normalizePort(process.env.APP_PORT || 3001);
  const host = process.env.APP_HOST || "0.0.0.0";
  server.listen({
    port,
    host
  });
  server.on("error", error => onError(error, port));
  server.on("listening", () => {
    logger.info(`http server listening on port ${port}`);
  });

  return server;
};
