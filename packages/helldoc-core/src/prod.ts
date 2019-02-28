import * as Webpack from "webpack";

import prepare, { CLIOptions } from "./prepare";
import createClientConfig from "./webpack/createClientConfig";

async function prod(sourceDir: string, cliOptions: CLIOptions) {
  process.env.NODE_ENV = "production";

  console.log("\nExtracting site metadata...");
  const options = await prepare(sourceDir, cliOptions);

  const configChain = createClientConfig(options);
  const config = configChain.toConfig();
  const compiler = Webpack(config);

  compiler.run((err, stats) => {
    console.log(err, stats.compilation.errors);
    if (err) {
      console.error(err);
    }
    console.log("\nProd site done.");
  });
}

export default prod;
