import { AppContext } from "../../types";
import { join } from "path";
import { readdirSync, existsSync } from "fs-extra";
import { isJS } from "../util/regex";
import { toModuleMap } from "./util";

export default async function({ themePath }: AppContext) {
  const layoutsPath = join(themePath, "layouts");
  if (existsSync(layoutsPath)) {
    const files = readdirSync(layoutsPath)
      .filter(isJS)
      .map(file => {
        const moduleName = file.slice(0, -3);
        const absolutePath = join(layoutsPath, file);
        return [moduleName, absolutePath] as [string, string];
      });
    return toModuleMap(files);
  }
  return "";
}
