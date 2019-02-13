import chalk from "chalk";
import chokidar = require("chokidar");
import path = require("path");
import opn = require("opn");
import Webpack = require("webpack");
import WebpackDevServer = require("webpack-dev-server");

import prepare from "./prepare";
import createClientConfig from "./webpack/createClientConfig";

async function dev(sourceDir, cliOptions = {}) {
  console.log("\nExtracting site metadata...");
  const options = await prepare(sourceDir);

  // setup watchers to update options and dynamically generated files
  const update = (...args) => {
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
  // add some thing here.
  const config = configChain.toConfig();

  const host = "0.0.0.0";
  const port = 8080;

  // const nonExistentDir = path.resolve(__dirname, "non-existent");
  const devServerOptions = {
    host,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    port,
    stats: {
      colors: true
    },
    contentBase: path.join(__dirname, "public")
  };
  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);

  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, devServerOptions);
  await server.listen(port, host);

  // opn remove
  opn(`http://${host}:${port}`);
}

export default dev;
