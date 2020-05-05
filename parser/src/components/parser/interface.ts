import { PathLike } from "fs";
import { ParsedPath } from "path";

export interface IRecoveryFileParser {
  // init(): Promise<IRecoveryFileParser>;
  extractInfo(file: PathLike, encoding: BufferEncoding): Promise<Drive>;
}

export interface Drive {
  drive?: string;
  volumeLabel?: string;
  volumeSerialNumber?: string;
  directories: Array<Directory>;
  totalFiles: number;
  totalSize: number;
}

export interface IDrive extends Drive {
  incompleteDirectory?: IncompleteDirectory;
  processed: boolean;
}

export interface Directory {
  path?: string;
  name?: string;
  directories: Array<Directory>;
  files: Array<File>;
  time?: string;
  date: string;
}

export interface IncompleteDirectory extends Directory {
  processed: boolean;
}

export interface File {
  name: string;
  size: number;
  time: string;
  date: string;
}
