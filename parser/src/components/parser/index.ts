import { IRecoveryFileParser, Drive } from "./interface";
import { PathLike, readFile } from "fs";
import * as logging from "@utils/logging";
import { performance } from "perf_hooks";
import { promisify } from "util";
import regexPatterns from "./regex-patterns";
import { filetype } from "./file-type";

const escape = require("regex-escape");
const matchAll = require("string.prototype.matchall");

const readFileAsync = promisify(readFile);

const logger = logging.getLogger(__filename);

export default class RecoveryFileParser implements IRecoveryFileParser {
  private getMatchGroup(string: string, regex: RegExp): string | null {
    const match = string.match(regex);
    return match ? match[1] : null;
  }

  private getDriveLetter(recoveryFile: string): string {
    return this.getMatchGroup(recoveryFile, regexPatterns.driveLetter) || "";
  }

  private getVolumeLabel(recoveryFile: string): string {
    return this.getMatchGroup(recoveryFile, regexPatterns.volumeLabel) || "";
  }

  private getVolumeSerialNumber(recoveryFile: string): string {
    return (
      this.getMatchGroup(recoveryFile, regexPatterns.volumeSerialNumber) || ""
    );
  }

  private getTotalFiles(recoveryFile: string): string {
    return (
      this.getMatchGroup(recoveryFile, regexPatterns.volumeSerialNumber) || ""
    );
  }

  public async extractInfo(
    file: PathLike,
    encoding: BufferEncoding = "utf-8"
  ): Promise<Drive> {
    const t0 = performance.now();
    const recoveryFile = await readFileAsync(file, { encoding });
    let drive: Drive = {
      directories: [],
      totalFiles: 0,
      totalSize: 0
    };

    drive.drive = this.getDriveLetter(recoveryFile);
    drive.volumeLabel = this.getVolumeLabel(recoveryFile);
    drive.volumeSerialNumber = this.getVolumeSerialNumber(recoveryFile);

    let directories = [...matchAll(recoveryFile, /(?:\sDirectory\sof\s)(.+)/g)];

    directories = directories
      .map(line => line[1])
      .map((line: string) => ({
        path: line,
        name: line.split(/\/|\\/).pop() || ""
      }))
      .map(dir => {
        let regex = new RegExp(
          "Directory of " +
            escape(dir.path) +
            "(?:\r|\n){1,4}((.+(?:\r|\n){2})+)",
          "g"
        );
        let regexMatch = [...matchAll(recoveryFile, regex, "g")][0];
        let entries = regexMatch[1] || [];
        let directories = entries
          .split(/\r\n/)
          .slice(2, -2)
          .filter((line: string) => line.search(/\<DIR\>/) !== -1)
          .map((line: string) => {
            let date = (
              (line.match(/(\d{2}\/\d{2}\/\d{4})/) || [])[1] || ""
            ).trim();
            let time = (
              (line.match(
                /(?:\d{2}\/\d{2}\/\d{4}\s\s)(\d{1,2}\:\d{1,2}\s(?:A|P)M\s+)/
              ) || [])[1] || ""
            ).trim();
            let name = (
              (line.match(/(?:\<DIR\>\s+)(.+)/) || [])[1] || ""
            ).trim();
            let path = dir.path;
            return { date, time, name, path };
          });
        return {
          ...dir,
          directories
        };
      })
      .map(dir => {
        let regex = new RegExp(
          "Directory of " +
            escape(dir.path) +
            "(?:\r|\n){1,4}((.+(?:\r|\n){2})+)",
          "g"
        );
        let regexMatch = [...matchAll(recoveryFile, regex, "g")][0];
        let entries = regexMatch[1] || [];
        let numberOfFiles = parseInt(
          (regexMatch[2].match(/\s+(\d+)\sFile\(s\)\s\s/) || ["0"])[1].trim()
        );
        let totalSize = parseInt(
          (regexMatch[2].match(/\s+\d+\sFile\(s\)\s+(.+)\s.+/) || ["0"])[1]
            .replace(/,/g, "")
            .trim()
        );
        let info: any = {};
        let files = entries
          .split(/\r\n/)
          .slice(2, 2 + numberOfFiles)
          .map((line: string) => {
            let date = (
              (line.match(/(\d{2}\/\d{2}\/\d{4})/) || [])[1] || ""
            ).trim();
            let time = (
              (line.match(
                /(?:\d{2}\/\d{2}\/\d{4}\s\s)(\d{1,2}\:\d{1,2}\s(?:A|P)M\s+)/
              ) || [])[1] || ""
            ).trim();
            let size = eval(
              (
                (line.match(
                  /(?:\d{2}\/\d{2}\/\d{4}\s\s\d{1,2}\:\d{1,2}\s(?:A|P)M\s+)(.+(?:\s))/
                ) || [])[1] || "0"
              )
                .replace(/,/g, "")
                .trim()
            );
            let name = (
              (line.match(
                /(?:\d{2}\/\d{2}\/\d{4}\s\s\d{1,2}\:\d{1,2}\s(?:A|P)M\s+.+(?:\s))(.+)/
              ) || [])[1] || ""
            ).trim();

            let type = filetype(name);

            info[type] = info[type] ? info[type] + 1 : 1;

            let tempFile = {
              date,
              name,
              size,
              time
            };
            return tempFile;
          });
        return {
          ...dir,
          files,
          numberOfFiles,
          totalSize,
          info
        };
      });

    let reverseList = [...directories].reverse();

    for (const dir of reverseList) {
      let parentDirPath = dir.path.replace(dir.name, "").slice(0, -1);
      let parentDirIndex = directories.findIndex(d => d.path === parentDirPath);
      if (parentDirIndex !== -1) {
        let childDirIndex = directories[parentDirIndex].directories.findIndex(
          (d: any) => d.name === dir.name
        );
        if (childDirIndex !== -1) {
          directories[parentDirIndex].directories[childDirIndex] = dir;
          let info = {
            ...directories[parentDirIndex].info
          };
          let childInfo = {
            ...dir.info
          };
          for (const key of Object.keys(childInfo).concat(Object.keys(info))) {
            info[key] = info[key]
              ? childInfo[key]
                ? childInfo[key] + info[key]
                : info[key]
              : childInfo[key]
              ? childInfo[key]
              : undefined;
          }
          directories[parentDirIndex].info = info;
          directories = directories.filter(d => d.path !== dir.path);
        }
      }
    }
    drive.directories = directories;
    const t1 = performance.now();
    logger.info(`Recovery File parsed, time taken ${Math.round(t1 - t0)}ms`);
    return drive as Drive;
  }
}
