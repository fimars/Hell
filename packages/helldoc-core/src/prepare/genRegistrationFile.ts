import { resolve } from "path";
import { HellCtx } from "./resolveOptions";
import { isIndexFile } from "./util";

export default async function genRegistrationFile({
  sourceDir,
  pageFiles
}: HellCtx) {
  function genImport(file: string) {
    const name = toComponentName(file);
    const absolutePath = resolve(sourceDir, file);
    const code = `  "${name}": lazy(() => import(${JSON.stringify(
      absolutePath
    )}))`;
    return code;
  }
  return (
    `import React, { lazy } from 'react'\n` +
    `export default {\n${pageFiles.map(genImport).join(",\n")}\n};`
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
