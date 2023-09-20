import { IAuditErrors } from "../models/audit";
import { IConfigObj } from "../models/config";
import { ICounter } from "../models/counter";
import { IFindings } from "../models/findings";
import Console from "./console";

// eslint-disable-next-line
const fetch = require("node-fetch");
import * as fs from "fs";

export default {
  // This function checks if a url is valid.
  isUrl: async (url: string, errors: IAuditErrors[], counter: ICounter) => {
    const regexUrl = /(https?:\/\/[\w./-]+)/gm;
    counter.links.total++;
    if (!regexUrl.test(url)) {
      counter.links.error++;
      errors.push({
        exercise: undefined,
        msg: `The repository value of the configuration file is not a link: ${url}`,
      });
      return false;
    }

    const res = await fetch(url, { method: "HEAD" });
    if (!res.ok) {
      counter.links.error++;
      errors.push({
        exercise: undefined,
        msg: `The link of the repository is broken: ${url}`,
      });
    }

    return true;
  },
  checkForEmptySpaces: (str: string) => {
    const isEmpty = true;
    for (const letter of str) {
      if (letter !== " ") {
        return false;
      }
    }

    return isEmpty;
  },
  checkLearnpackClean: (configObj: IConfigObj, errors: IAuditErrors[]) => {
    if (
      (configObj.config?.outputPath &&
        fs.existsSync(configObj.config?.outputPath)) ||
      fs.existsSync(`${configObj.config?.dirPath}/_app`) ||
      fs.existsSync(`${configObj.config?.dirPath}/reports`) ||
      fs.existsSync(`${configObj.config?.dirPath}/resets`) ||
      fs.existsSync(`${configObj.config?.dirPath}/app.tar.gz`) ||
      fs.existsSync(`${configObj.config?.dirPath}/config.json`) ||
      fs.existsSync(`${configObj.config?.dirPath}/vscode_queue.json`)
    ) {
      errors.push({
        exercise: undefined,
        msg: "You have to run learnpack clean command",
      });
    }
  },
  findInFile: (types: string[], content: string) => {
    const regex: any = {
      relativeImages:
        /!\[.*]\s*\((((\.\/)?(\.{2}\/){1,5})(.*\/)*(.[^\s/]*\.[A-Za-z]{2,4})\S*)\)/gm,
      externalImages: /!\[.*]\((https?:\/(\/[^)/]+)+\/?)\)/gm,
      markdownLinks: /(\s)+\[.*]\((https?:\/(\/[^)/]+)+\/?)\)/gm,
      url: /(https?:\/\/[\w./-]+)/gm,
      uploadcare: /https:\/\/ucarecdn.com\/(?:.*\/)*([\w./-]+)/gm,
    };

    const validTypes = Object.keys(regex);
    if (!Array.isArray(types)) 
types = [types];

    const findings: IFindings = {};
    type findingsType =
      | "relativeImages"
      | "externalImages"
      | "markdownLinks"
      | "url"
      | "uploadcare";

    for (const type of types) {
      if (!validTypes.includes(type)) 
throw new Error("Invalid type: " + type);
      else 
findings[type as findingsType] = {};
    }

    for (const type of types) {
      let m: RegExpExecArray;
      while ((m = regex[type].exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        // m.forEach((match, groupIndex) => values.push(match));

        findings[type as findingsType]![m[0]] = {
          content: m[0],
          absUrl: m[1],
          mdUrl: m[2],
          relUrl: m[6],
        };
      }
    }

    return findings;
  },
  // This function checks if there are errors, and show them in the console at the end.
  showErrors: (errors: IAuditErrors[], counter: ICounter | undefined) => {
    return new Promise((resolve, reject) => {
      if (errors) {
        if (errors.length > 0) {
          Console.log("Checking for errors...");
          for (const [i, error] of errors.entries())
            Console.error(
              `${i + 1}) ${error.msg} ${
                error.exercise ? `(Exercise: ${error.exercise})` : ""
              }`
            );
          if (counter) {
            Console.error(
              ` We found ${errors.length} error${
                errors.length > 1 ? "s" : ""
              } among ${counter.images.total} images, ${
                counter.links.total
              } link, ${counter.readmeFiles} README files and ${
                counter.exercises
              } exercises.`
            );
          } else {
            Console.error(
              ` We found ${errors.length} error${
                errors.length > 1 ? "s" : ""
              } related with the project integrity.`
            );
          }

          process.exit(1);
        } else {
          if (counter) {
            Console.success(
              `We didn't find any errors in this repository among ${counter.images.total} images, ${counter.links.total} link, ${counter.readmeFiles} README files and ${counter.exercises} exercises.`
            );
          } else {
            Console.success(`We didn't find any errors in this repository.`);
          }

          process.exit(0);
        }
      } else {
        reject("Failed");
      }
    });
  },
  // This function checks if there are warnings, and show them in the console at the end.
  showWarnings: (warnings: IAuditErrors[]) => {
    return new Promise((resolve, reject) => {
      if (warnings) {
        if (warnings.length > 0) {
          Console.log("Checking for warnings...");
          for (const [i, warning] of warnings.entries())
            Console.warning(
              `${i + 1}) ${warning.msg} ${
                warning.exercise ? `File: ${warning.exercise}` : ""
              }`
            );
        }

        resolve("SUCCESS");
      } else {
        reject("Failed");
      }
    });
  },
};
