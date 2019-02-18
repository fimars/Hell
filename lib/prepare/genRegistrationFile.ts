import { resolve } from "path";
import { HellOptions } from "./resolveOptions";
import { isIndexFile } from "./util";

export default async function genRegistrationFile({
  sourceDir,
  pageFiles
}: HellOptions) {
  function genImport(file: string) {
    const name = toComponentName(file);
    const absolutePath = resolve(sourceDir, file);
    const code = `${name}: lazy(() => import(${JSON.stringify(absolutePath)}))`;
    return code;
  }
  return (
    `import React, { lazy } from 'react'\n` +
    `export const PageComponents = {\n ${pageFiles
      .map(genImport)
      .join(",\n")} \n};`
  );
}

function toComponentName(file: string) {
  const isIndex = isIndexFile(file);
  const normalize = (file: string) =>
    "Page" +
    file
      .replace(/\.md$/, "")
      .replace(/\/|\\/g, " ")
      .split(" ")
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join("");
  const normalizedName: string = isIndex ? "Index" : normalize(file);
  return normalizedName;
}
