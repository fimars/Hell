import { AppContext } from "../../types";
import { resolve } from "path";
import { toComponentName, toModuleMap } from "./util";

export default async function genRegistrationFile({
  sourceDir,
  pageFiles
}: AppContext) {
  function genRoutes(file: string): [string, string] {
    const name = toComponentName(file);
    const absolutePath = resolve(sourceDir, file);
    return [name, absolutePath];
  }
  const files = pageFiles.map(genRoutes);
  return toModuleMap(files);
}
