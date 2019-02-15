import Webpack = require("webpack");

import prepare from "./prepare";
import createClientConfig from "./webpack/createClientConfig";

async function prod(sourceDir: string, cliOptions = {}) {
  process.env.NODE_ENV = "production";

  console.log("\nExtracting site metadata...");
  const options = await prepare(sourceDir);

  const configChain = createClientConfig(options);
  const config = configChain.toConfig();
  const compiler = Webpack(config);

  compiler.run((err, stats) => {
    console.log(stats.compilation.modules, stats.compilation.compiler.options);
    if (err) {
      console.error(err);
    }
    console.log("\nProd site done. serve the /dist make a try.");
  });
}

export default prod;
