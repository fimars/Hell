import chalk from "chalk";
import * as chokidar from "chokidar";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import portfinder = require("portfinder");
import prepare from "./prepare";
import createClientConfig from "./webpack/createClientConfig";

import { CLIOptions, AppContext } from "../types";
import { resolve, posix, isAbsolute } from "path";
import { existsSync } from "fs-extra";
import { resolveStatic } from "./util/alias";

async function dev(sourceDir: string, cliOptions: CLIOptions) {
  try {
    const { server, port, host } = await prepareDevServer(
      sourceDir,
      cliOptions
    );
    server.listen(port, host, err => {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

async function prepareDevServer(sourceDir: string, cliOptions: CLIOptions) {
  console.log("\nExtracting site metadata...");
  const ctx = await prepare(sourceDir, cliOptions);
  watchSourceFiles(sourceDir);

  const host = "localhost";
  const port = await portfinder.getPortPromise();
  const config = resolveDevConfig(host, port, ctx);
  const contentBase = resolve(sourceDir, "public");
  const devServerOptions: WebpackDevServer.Configuration = {
    disableHostCheck: true,
    compress: true,
    host,
    hot: true,
    quiet: true,
    headers: {
      "access-control-allow-origin": "*"
    },
    watchOptions: {
      ignored: [/node_modules/]
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /./, to: posix.join(ctx.base, "index.html") }]
    },
    contentBase,
    publicPath: ctx.base,
    before(app) {
      if (existsSync(contentBase)) {
        app.use(ctx.base, require("express").static(contentBase));
      }
    }
  };

  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);

  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, devServerOptions);
  return { server, host, port };
}

function watchSourceFiles(sourceDir: string) {
  // setup watchers to update options and dynamically generated files
  const update = (file: string) => {
    console.log(`\nReload due to ${file}`);

    // hack
    if (!isAbsolute(file)) {
      file = resolve(sourceDir, file);
    }
    if (file.endsWith(".js")) {
      delete require.cache[file];
    }

    prepare(sourceDir).catch(err => {
      console.error(chalk.red(err.stack), false);
    });
  };

  //  watch add/remove of files
  const pagesWatcher = chokidar.watch(["**/*.md", "hell.config.js"], {
    cwd: sourceDir,
    ignoreInitial: true
  });
  pagesWatcher.on("add", update);
  pagesWatcher.on("change", update);
  pagesWatcher.on("unlink", update);
  pagesWatcher.on("addDir", update);
  pagesWatcher.on("unlinkDir", update);
}

function resolveDevConfig(host: string, port: number, ctx: AppContext) {
  const chainClient = createClientConfig(ctx);

  chainClient
    .plugin("html")
    .use(require("html-webpack-plugin"), [
      { template: resolveStatic("index.template.html") }
    ]);

  chainClient.plugin("head").use(require("./webpack/HeadPlugin"), [
    {
      tags: ctx.siteConfig.head || []
    }
  ]);

  chainClient.plugin("helldoc-log").use(require("./webpack/DevLogPlugin"), [
    {
      displayHost: host,
      port,
      publicPath: ctx.siteConfig.base || "/"
    }
  ]);
  const config = chainClient.toConfig();
  return config;
}

export default dev;
