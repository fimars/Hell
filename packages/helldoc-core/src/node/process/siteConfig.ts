import { existsSync } from "fs-extra";
import { resolve } from "path";
import { HellManContext } from "./server";

export function setupSiteConfig(context: HellManContext) {
  const configPath = resolve(context.helldocDir, "config.js");

  if (existsSync(configPath)) {
    context.siteConfig = {
      ...context.siteConfig,
      ...require(configPath)
    };
  }
}
