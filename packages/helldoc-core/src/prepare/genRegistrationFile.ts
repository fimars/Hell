import { resolve } from "path";
import { isIndexFile } from "./util";
import { AppContext } from "../types";
export default async function genRegistrationFile({
  sourceDir,
  pageFiles
}: AppContext) {
  function genRoutes(file: string) {
    const name = toComponentName(file);
    const absolutePath = resolve(sourceDir, file);
    const code = `["${name}"]: require("${absolutePath}").default`;
    return code;
  }
  return (
    `import React, { lazy } from 'react'\n` +
    `export default {\n  ${pageFiles.map(genRoutes).join(",\n  ")}\n};`
  );
}

export function toComponentName(file: string) {
  const isIndex = isIndexFile(file);
  const normalize = (file: string) =>
    "a-" +
    file
      .replace(/\.md$/, "")
      .replace(/\/|\\/g, " ")
      .split(" ")
      .join("");
  const normalizedName: string = isIndex ? "index" : normalize(file);
  return normalizedName;
}
