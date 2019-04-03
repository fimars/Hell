import Config = require("webpack-chain");

import { resolveAppPath } from "./util";
import createBaseConfig from "./createBaseConfig";
import { AppContext } from "../types";
export default function(ctx: AppContext): Config {
  const config = createBaseConfig(ctx);

  if (process.env.NODE_ENV === "production") {
    config.entry("client").add(resolveAppPath("client"));
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
    config.entry("app").add(resolveAppPath("app"));
    config.plugin("time-fix").use(require("time-fix-plugin"));
    config.plugin("hmr").use(require("webpack/lib/HotModuleReplacementPlugin"));
  }
  return config;
}
