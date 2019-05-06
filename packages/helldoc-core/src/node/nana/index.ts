import { load, SITE_CONFIG_FILES } from "../utils/configLoader";
import { AsyncSeriesHook, SyncHook } from "tapable";
import { resolve, join } from "path";
import { resolvePackage } from "../webpack/util";
import merge = require("lodash.merge");
import Transformers from "./Transformers";
import Pages from "./Pages";

type Options = {
  cwd: string;
};
type Config = {
  theme?: string;
  ignores?: string[];
};

export class Nana {
  opts: Options;
  config: Config;
  hooks: {
    afterPlugins: SyncHook;
    beforeRun: AsyncSeriesHook;
    emitPages: AsyncSeriesHook;
    emitRoutes: AsyncSeriesHook;
  };
  pages: Pages;
  transformers: Transformers;
  theme?: string;

  constructor(opts: Options, config: Config = {}) {
    this.opts = opts;
    this.opts.cwd = resolve(opts.cwd || ".");
    this.config = config;
    this.hooks = {
      afterPlugins: new SyncHook(),
      beforeRun: new AsyncSeriesHook(),
      emitPages: new AsyncSeriesHook(),
      emitRoutes: new AsyncSeriesHook()
    };
    this.pages = new Pages(this);
    this.transformers = new Transformers();

    this.prepare();
  }

  prepare() {
    const { path: configpath, data: config } = load(SITE_CONFIG_FILES, {
      cwd: resolve(this.opts.cwd, ".helldoc")
    });
    this.config = merge({}, config, this.config);

    if (configpath) {
      console.log(`Using site config file: \n  ${configpath}`);
    }

    // Load theme
    if (this.config.theme) {
      this.theme = resolvePackage(this.config.theme, {
        prefix: "helldoc-theme-",
        cwd: this.opts.cwd
      });

      console.log(`Using site theme: \n  ${this.config.theme}`);
    } else {
      this.theme = resolvePackage("helldoc-theme-default", {
        cwd: __dirname
      });

      console.log(`Using helldoc default theme.`);
    }

    // Load plugins
    const plugins = this.getPlugins();
    for (const plugin of plugins) {
      plugin.apply(this, plugin.options);
    }
  }

  getPlugins() {
    type Plugin = { resolve: string; options?: any };

    const builtinPlugins: Plugin[] = [
      { resolve: require.resolve("../plugins/collectPages") },
      { resolve: require.resolve("../plugins/transformerMarkdown") }
    ];

    const plugins = builtinPlugins.map(({ resolve, options }) => {
      const plugin = require(resolve);
      plugin.__path = resolve;
      plugin.options = options;
      return plugin;
    });
    return plugins;
  }

  async run() {
    await this.hooks.beforeRun.promise();
  }

  async serve() {
    await this.run();
  }

  resolveNana(...args: string[]) {
    return join(this.opts.cwd, ".nana", ...args);
  }

  resolveCwd(...args: string[]) {
    return join(this.opts.cwd, ...args);
  }
}

// function boot(cwd = "."): Nana {
//   const nana = new Nana({ cwd });
//   return nana;
// }

// boot("./packages/docs/").run();
