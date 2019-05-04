import { existsSync } from "fs-extra";
import { resolve } from "path";

// TODO: use egoist/joycon support multiple configuration types.
export function loadConfig(name: string, cwd: string) {
  const configPath = resolve(cwd, name);
  if (existsSync(configPath)) {
    return require(configPath) || {};
  }
  return {};
}
