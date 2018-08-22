import path = require("path");
import Config = require("webpack-chain");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import { atApp, atLib } from "./resolvePaths";

export default function() {
  const config = new Config();

  config.entry("app").add(atApp("app.ts"));

  // TODO: remove this preset
  config.set("mode", "development");
  config.devtool("inline-source-map");

  // 支持TypeScript扩展
  config.resolve.extensions
    .add(".ts")
    .add(".tsx")
    .add(".js")
    .add(".jsx")
    .add("scss");

  config.resolve.alias
    // TODO: lib可能用不上 will be removed
    .set("lib", atLib())
    .set("@", atApp())
    .set("theme", atLib("default-theme"));

  const defaultHtmlTemplate = atApp("index.html");
  config
    .plugin("html")
    .use(HtmlWebpackPlugin, [{ template: defaultHtmlTemplate }]);

  // TypeScript
  config.module
    .rule("typescript")
    .test(/\.tsx?$/)
    .use("typescript")
    .loader("ts-loader")
    .options({
      configFile: atLib("tsconfig.app.json")
    });

  // TODO: Use pipe loader for scss file in WebpackChain.
  // Scss
  const baseConfig = config.module.rule("scss").test(/\.scss$/);
  baseConfig.use("style-loader").loader("style-loader");
  baseConfig.use("css-loader").loader("css-loader");
  baseConfig.use("sass-loader").loader("sass-loader");

  return config;
}
