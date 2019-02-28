import chalk from "chalk";
import { join } from "path";
import * as chokidar from "chokidar";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import portfinder = require("portfinder");

import prepare, { CLIOptions } from "./prepare";
import createClientConfig from "./webpack/createClientConfig";

async function dev(sourceDir: string, cliOptions: CLIOptions) {
  const { server, port, host } = await prepareDevServer(sourceDir, cliOptions);
  server.listen(port, host, err => {
    if (err) {
      console.log(err);
    }
  });
}

async function prepareDevServer(sourceDir: string, cliOptions: CLIOptions) {
  console.log("\nExtracting site metadata...");
  const options = await prepare(sourceDir, cliOptions);

  // setup watchers to update options and dynamically generated files
  const update = (file: string) => {
    console.log(`\nReload due to ${file}`);
    prepare(sourceDir).catch(err => {
      console.error(chalk.red(err.stack), false);
    });
  };

  //  watch add/remove of files
  const pagesWatcher = chokidar.watch(["**/*.md"], {
    cwd: sourceDir,
    ignoreInitial: true
  });
  pagesWatcher.on("add", update);
  pagesWatcher.on("change", update);
  pagesWatcher.on("unlink", update);
  pagesWatcher.on("addDir", update);
  pagesWatcher.on("unlinkDir", update);

  // mount the dev server
  const configChain = createClientConfig(options);
  const host = "0.0.0.0";
  const port = await portfinder.getPortPromise();

  configChain.plugin("helldoc-log").use(require("./webpack/DevLogPlugin"), [
    {
      displayHost: host,
      port,
      publicPath: options.siteConfig.base || "/"
    }
  ]);

  const devServerOptions: WebpackDevServer.Configuration = {
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
      disableDotRule: true
    },
    publicPath: options.publicPath,
    contentBase: join(__dirname, "public")
  };
  const config = configChain.toConfig();
  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);

  const compiler = Webpack(config);

  const server = new WebpackDevServer(compiler, devServerOptions);
  return {
    server,
    host,
    port
  };
}

export default dev;
