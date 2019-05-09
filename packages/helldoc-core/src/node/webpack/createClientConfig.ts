import Config = require("webpack-chain");
import createBaseConfig from "./createBaseConfig";

import { resolveApp } from "../utils/alias";
import { Nana } from "../nana";

export default function(ctx: Nana): Config {
  const config = createBaseConfig(ctx);

  config.entry("client").add(resolveApp("client"));

  if (process.env.NODE_ENV === "production") {
    config.plugin("loadable").use(require("@loadable/webpack-plugin"), [
      {
        filename: "web-stats.json"
      }
    ]);
    config
      .plugin("optimize-css")
      .use(require("optimize-css-assets-webpack-plugin"), [
        {
          canPrint: false,
          cssProcessorOptions: {
            autoprefixer: { disable: true },
            mergeLonghand: false,
            safe: true
          }
        }
      ]);
  } else {
    config.plugin("time-fix").use(require("time-fix-plugin"));
    config.plugin("hmr").use(require("webpack/lib/HotModuleReplacementPlugin"));
  }
  return config;
}
