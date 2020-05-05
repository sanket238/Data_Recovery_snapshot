import { name as packageName } from "../../package.json";
import { basename } from "path";
import * as pino from "pino";

export const getLogger = (filename: string = "") =>
  pino({
    name: `${packageName}${
      basename(filename) !== "" ? "/" + basename(filename) : basename(filename)
    }`,
    level: "debug"
  });
