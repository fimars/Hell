import Config = require("webpack-chain");
import createBaseConfig from "./createBaseConfig";

import { AppContext } from "../../types";
import { resolveApp } from "../util/alias";

export default function(ctx: AppContext): Config {
  const config = createBaseConfig(ctx);

  config.entry("client").add(resolveApp("client"));

  if (process.env.NODE_ENV === "production") {
    config.plugin("webpack-assets").use(require("webpack-manifest-plugin"));
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
