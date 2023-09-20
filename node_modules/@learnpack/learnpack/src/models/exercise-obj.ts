import { IFile } from "./file";
import { IConfig } from "./config";
import { ISocket } from "./socket";

export interface IExercise {
  position?: number;
  files: Array<IFile>;
  slug: string;
  path: string;
  done: boolean;
  language?: string | null;
  entry?: string | null;
  graded?: boolean;
  translations?: { [key: string]: string };
  title: string;
  getReadme?: (lang: string | null) => any;
  getFile?: (name: string) => string | Buffer;
  saveFile?: (name: string, content: string) => void;
  getTestReport?: () => any;
  test?: (sessionConfig: any, config: IConfig, socket: ISocket) => void;
}

export interface IExerciseData {
  exerciseSlug: string;
  files: string[];
}
