import * as Webpack from "webpack";

import prepare, { CLIOptions } from "./prepare";
import createClientConfig from "./webpack/createClientConfig";
import { resolve } from "path";
import { existsSync } from "fs-extra";

async function prod(sourceDir: string, cliOptions: CLIOptions) {
  process.env.NODE_ENV = "production";

  console.log("\nExtracting site metadata...");
  const options = await prepare(sourceDir, cliOptions);

  const configChain = createClientConfig(options);

  const publicDir = resolve(sourceDir, "public");
  if (existsSync(publicDir)) {
    configChain
      .plugin("copy")
      .use(require("copy-webpack-plugin"), [
        [{ from: publicDir, to: options.outDir }]
      ]);
  }

  const config = configChain.toConfig();
  const compiler = Webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      return console.log(err);
    }
    if (stats.hasErrors()) {
      (stats.toJson().errors as Error[]).forEach(err => {
        console.error(err);
      });
      throw new Error(`Failed to compile with errors.`);
    }
    console.log("\nProd site done.");
  });
}

export default prod;
