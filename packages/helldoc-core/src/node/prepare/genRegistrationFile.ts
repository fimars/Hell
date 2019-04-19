import { AppContext } from "../../types";
import { resolve } from "path";
import { toComponentName, toModuleMap } from "./util";

export default async function genRegistrationFile({
  sourceDir,
  pageFiles
}: AppContext) {
  function genRoutes(file: string): [string, string] {
    const name = toComponentName(file);
    const absolutePath = JSON.stringify(resolve(sourceDir, file));
    const value = `React.createFactory(loadable(() => import(${absolutePath}), { fallback: <div>loading...</div> }))`;
    return [name, value];
  }
  const files = pageFiles.map(genRoutes);
  return [
    `import loadable from '@loadable/component';`,
    `import * as React from 'react';`,
    toModuleMap(files)
  ].join("\n");
}
