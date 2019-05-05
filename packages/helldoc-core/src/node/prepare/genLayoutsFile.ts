import { AppContext } from "../../types";
import { join } from "path";
import { readdirSync, existsSync } from "fs-extra";
import { isJS } from "../utils/regex";
import { toModuleMap } from "./util";

export default async function({ themePath }: AppContext) {
  const layoutsPath = join(themePath, "layouts");
  if (existsSync(layoutsPath)) {
    const files = readdirSync(layoutsPath)
      .filter(isJS)
      .map(file => {
        const moduleName = file.slice(0, -3);
        const absolutePath = JSON.stringify(join(layoutsPath, file));
        const moduleValue = `require(${absolutePath}).default`;
        return [moduleName, moduleValue] as [string, string];
      });
    return toModuleMap(files);
  }
  return "";
}
