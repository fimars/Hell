import { SyncHook } from "tapable";
import { setupSiteConfig } from "./siteConfig";
import { resolve } from "path";
import { SiteConfig } from "../../types";

export type HellManContext = {
  cwd: string;
  helldocDir: string;
  siteConfig: SiteConfig;
};

class HellMan {
  context: HellManContext;

  public hooks: {
    extandContext: SyncHook<HellManContext>;
    log: SyncHook<string>;
  };

  constructor(cwd: string) {
    this.context = {
      cwd: resolve(cwd),
      helldocDir: resolve(cwd, ".helldoc"),
      siteConfig: {}
    };
    this.hooks = {
      extandContext: new SyncHook(["context"]),
      log: new SyncHook(["message"])
    };
  }

  refresh() {
    this.hooks.extandContext.call(this.context);
  }
}

export function boot(cwd = "."): HellMan {
  const man = new HellMan(cwd);

  // load built-in plugin.
  man.hooks.extandContext.tap("config", setupSiteConfig);

  return man;
}
