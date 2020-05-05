import { getLogger } from "../../src/utils/logging";
import { mockProcessStdout } from "jest-mock-process";

describe("logger tests", () => {
  describe("getLogger", () => {
    it("can be called without args", () => {
      const logger = getLogger();

      const mockStdout = mockProcessStdout();

      logger.info("Hello");

      expect(mockStdout).toHaveBeenCalledTimes(1);
    });

    it("can be called with args", () => {
      const logger = getLogger(__filename);

      const mockStdout = mockProcessStdout();

      logger.info("Hello");

      expect(mockStdout).toHaveBeenCalledTimes(1);
    });
  });
});
