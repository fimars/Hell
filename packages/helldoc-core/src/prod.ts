import * as Webpack from "webpack";
import * as fs from "fs-extra";
import prepare from "./prepare";
import createClientConfig from "./webpack/createClientConfig";
import createServerConfig from "./webpack/createServerConfig";

import { CLIOptions, AppContext } from "./types";
import { resolve } from "path";
import { existsSync, emptyDir } from "fs-extra";

async function prod(sourceDir: string, cliOptions: CLIOptions) {
  process.env.NODE_ENV = "production";

  const ctx = await prepare(sourceDir, cliOptions);
  await emptyDir(ctx.outDir);

  const server = resolveServerConfig(ctx);
  const client = resolveClientConfig(sourceDir, ctx);
  await compile(client);
  await compile(server);

  genStaticHTMLFiles(ctx);
}
export default prod;

function resolveServerConfig(ctx: AppContext) {
  const chainServer = createServerConfig(ctx);
  return chainServer.toConfig();
}
function resolveClientConfig(sourceDir: string, ctx: AppContext) {
  const chainClient = createClientConfig(ctx);
  const publicDir = resolve(sourceDir, "public");
  if (existsSync(publicDir)) {
    chainClient
      .plugin("copy")
      .use(require("copy-webpack-plugin"), [
        [{ from: publicDir, to: ctx.outDir }]
      ]);
  }
  return chainClient.toConfig();
}

function genStaticHTMLFiles(ctx: AppContext) {
  const resolveOutDir = (path: string) => resolve(ctx.outDir, path);
  fs.writeJSONSync(resolveOutDir("head.manifest.json"), ctx.siteConfig.head);
  require(resolveOutDir("scripts/ssr.js"));
  fs.removeSync(resolveOutDir("scripts"));
  fs.removeSync(resolveOutDir("head.manifest.json"));
  fs.removeSync(resolveOutDir("manifest.json"));
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
