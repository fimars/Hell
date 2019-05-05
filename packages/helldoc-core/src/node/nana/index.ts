import { SiteConfig } from "../../types";
import { loadConfig } from "../utils/configLoader";
import { Hook } from "tapable";

import merge = require("lodash.merge");
import { resolve } from "path";

type Opts = {
  cwd: string;
  configCwd?: string;
  siteConfig?: SiteConfig;
};

class Nana {
  opts: Opts;
  config: {};
  hooks: {
    [hookName: string]: Hook;
  };

  constructor(opts: Opts, config = {}) {
    this.opts = opts;
    this.opts.cwd = resolve(opts.cwd || ".");
    this.config = config;
    this.hooks = {};
  }

  prepare() {
    // load Nana Config -> opts
    this.opts = merge(this.opts, loadConfig("nana.config.js", this.opts.cwd));
    // load Site Config -> config
    this.config = merge(this.opts, loadConfig("siteConfig.js", this.opts.cwd));
    // load theme Config
    // run()
  }

  run() {
    // handle internal files
  }

  serve() {}
}

export function boot(cwd = "."): Nana {
  const nana = new Nana({ cwd });
  return nana;
}
