import Config = require("webpack-chain");

import { atApp } from "../util/resolvePaths";
import { HellOptions } from "../prepare/resolveOptions";
import createBaseConfig from "./createBaseConfig";

export default function(ctx: HellOptions): Config {
  const config = createBaseConfig(ctx);

  config.entry("app").add(atApp("app.ts"));

  if (process.env.NODE_ENV === "production") {
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
    config.plugin("hmr").use(require("webpack/lib/HotModuleReplacementPlugin"));
  }
  return config;
}
