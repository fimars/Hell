import * as Webpack from "webpack";
import SSR from "./ssr";
import prepare from "./prepare";
import createClientConfig from "./webpack/createClientConfig";
import createServerConfig from "./webpack/createServerConfig";
import { resolve } from "path";
import { existsSync, emptyDir } from "fs-extra";
import { CLIOptions, AppContext } from "../types";
import { resolveStatic } from "./utils/alias";

async function prod(sourceDir: string, cliOptions: CLIOptions) {
  process.env.NODE_ENV = "production";

  const ctx = await prepare(sourceDir, cliOptions);
  await emptyDir(ctx.outDir);

  const server = resolveServerConfig(ctx);
  const client = resolveClientConfig(sourceDir, ctx);
  await compile(client);
  await compile(server);
  await new SSR(ctx, resolveStatic("index.template.html")).run();
  console.log("\nProd site done.");
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
      resolve();
    });
  });
}
