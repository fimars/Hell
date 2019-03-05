import Config = require("webpack-chain");

import { HellCtx } from "../prepare/resolveOptions";
import { resolveAppPath } from "./util";
import createBaseConfig from "./createBaseConfig";

export default function(ctx: HellCtx): Config {
  const config = createBaseConfig(ctx);

  config.entry("app").add(resolveAppPath("app"));

  config.plugin("head").use(require("./HeadPlugin"), [
    {
      tags: ctx.siteConfig.head || []
    }
  ]);

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
    config.plugin("time-fix").use(require("time-fix-plugin"));
    config.plugin("hmr").use(require("webpack/lib/HotModuleReplacementPlugin"));
  }
  return config;
}
