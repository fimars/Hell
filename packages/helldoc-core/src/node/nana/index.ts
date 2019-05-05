import { SiteConfig } from "../../types";
import {
  load,
  NANA_CONFIG_FILES,
  SITE_CONFIG_FILES
} from "../utils/configLoader";
import { Hook } from "tapable";

import merge = require("lodash.merge");
import { resolve } from "path";

type Options = {
  cwd: string;
  siteConfig?: SiteConfig;
};

class Nana {
  opts: Options;
  config: {};
  hooks: {
    [hookName: string]: Hook;
  };

  constructor(opts: Options, config = {}) {
    this.opts = opts;
    this.opts.cwd = resolve(opts.cwd || ".");
    this.config = config;
    this.hooks = {};

    this.prepare();
  }

  prepare() {
    const loadOptions = {
      cwd: resolve(this.opts.cwd, ".helldoc")
    };

    const { path: nanapath, data: nana } = load(NANA_CONFIG_FILES, loadOptions);
    this.opts = merge({}, nana, this.opts);
    if (nanapath) {
      console.log(`Using nana config file: \n  ${nanapath}`);
    }

    const { path: configpath, data: config } = load(
      SITE_CONFIG_FILES,
      loadOptions
    );
    this.config = merge({}, config, this.config);
    if (configpath) {
      console.log(`Using site config file: \n  ${configpath}`);
    }

    // load theme Config
  }

  async run() {}

  async serve() {
    await this.run();
  }
}

export function boot(cwd = "."): Nana {
  const nana = new Nana({ cwd });
  return nana;
}

boot("./packages/docs/");
