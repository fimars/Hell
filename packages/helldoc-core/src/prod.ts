import * as Webpack from "webpack";
import * as fs from "fs-extra";

import prepare from "./prepare";
import createClientConfig from "./webpack/createClientConfig";
import createBaseConfig from "./webpack/createBaseConfig";
import { resolve } from "path";
import { existsSync, emptyDir } from "fs-extra";
import { CLIOptions, AppContext } from "./types";
import { resolveAppPath } from "./webpack/util";

import nodeExternals = require("webpack-node-externals");

async function prod(sourceDir: string, cliOptions: CLIOptions) {
  process.env.NODE_ENV = "production";

  const options = await prepare(sourceDir, cliOptions);
  await emptyDir(options.outDir);

  const server = resolveServerConfig(options);
  const client = resolveClientConfig(sourceDir, options);
  await Promise.all([compile(client), compile(server)]);

  const ssrScriptPath = resolve(options.outDir, "scripts/ssr.js");
  require(ssrScriptPath); // run the server script

  fs.removeSync(ssrScriptPath);
}
export default prod;

function resolveServerConfig(options: AppContext) {
  const chainServer = createBaseConfig(options);
  chainServer.entry("server").add(resolveAppPath("ssr"));
  chainServer.target("node");
  chainServer.externals(nodeExternals());
  chainServer.node.set("__dirname", false);
  chainServer.output.filename("scripts/ssr.js");
  return chainServer.toConfig();
}
function resolveClientConfig(sourceDir: string, options: AppContext) {
  const chainClient = createClientConfig(options);
  const publicDir = resolve(sourceDir, "public");
  if (existsSync(publicDir)) {
    chainClient
      .plugin("copy")
      .use(require("copy-webpack-plugin"), [
        [{ from: publicDir, to: options.outDir }]
      ]);
  }
  return chainClient.toConfig();
}

function compile(config: Webpack.Configuration) {
  return new Promise((resolve, reject) => {
    const compiler = Webpack(config);
    compiler.run((err, stats) => {
      if (err) {
        return console.log(err);
      }
      if (stats.hasErrors()) {
        (stats.toJson().errors as Error[]).forEach(err => {
          console.error(err);
        });
        reject(new Error(`Failed to compile with errors.`));
      }
      console.log("\nProd site done.");
      resolve();
    });
  });
}
