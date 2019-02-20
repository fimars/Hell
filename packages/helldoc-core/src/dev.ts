import chalk from "chalk";
import { join } from "path";
import * as chokidar from "chokidar";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import opn = require("opn");

import prepare from "./prepare";
import createClientConfig from "./webpack/createClientConfig";

async function dev(sourceDir: string) {
  console.log("\nExtracting site metadata...");
  const options = await prepare(sourceDir);

  // setup watchers to update options and dynamically generated files
  const update = () => {
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
    contentBase: join(__dirname, "public")
  };
  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);

  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, devServerOptions);
  await server.listen(port, host);

  // opn remove
  opn(`http://${host}:${port}`);
}

export default dev;
