import { IExercise } from "./exercise-obj";

export type TGrading = "isolated" | "incremental" | "no-grading";

export type TMode = "preview" | "standalone";

export type TConfigAction = "test" | "build" | "tutorial" | "reset";

export type TConfigObjAttributes = "config" | "exercises" | "grading";

export type TCompiler =
  | "webpack"
  | "vanillajs"
  | "vue"
  | "react"
  | "css"
  | "html";

export interface IConfigPath {
  base: string;
}

export interface IEditor {
  mode?: TMode;
  version: string;
  agent?: string;
}

export interface TEntries {
  python3?: string;
  html?: string;
  node?: string;
  react?: string;
  java?: string;
}

export interface IConfig {
  port?: string;
  repository?: string;
  description?: string;
  slug?: string;
  dirPath: string;
  preview?: string; // Picture thumbnail
  entries: TEntries;
  grading: TGrading;
  configPath: string;
  translations: Array<string>;
  outputPath?: string;
  editor: IEditor;
  language: string;
  title: string;
  duration: number;
  difficulty?: string;
  exercisesPath: string;
  disableGrading: boolean; // TODO: Deprecate
  actions: Array<string>; // TODO: Deprecate
  autoPlay: boolean;
  projectType?: string;
  // TODO: nameExerciseValidation
  contact?: string;
  disabledActions?: Array<TConfigAction>;
  compiler: TCompiler;
  publicPath: string;
  publicUrl?: string;
  skills: Array<string>;
  runHook: (...agrs: Array<any>) => void;
  testingFinishedCallback: (arg: any | undefined) => void;
}

export interface IConfigObj {
  session?: number;
  currentExercise?: any;
  config?: IConfig;
  exercises?: Array<IExercise>;
  confPath?: IConfigPath;
  address?: string; // Maybe
}
