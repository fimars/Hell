import HtmlWebpackPlugin = require("html-webpack-plugin");
import webpack = require("webpack");
import Config = require("webpack-chain");
import MarkdownLoader = require("./markdownLoader"); // hack for compile

import { atApp, atLib } from "../util/resolvePaths";

export default function({
  sourceDir,
  markdown
}) {
  const config = new Config();

  config
    .entry("app")
    .add(atApp("app.ts"));

  config.mode("development");
  config.devtool("source-map");

  // 支持TypeScript扩展
  config.resolve.extensions.merge(
    [".ts", ".tsx", ".js", ".jsx", ".md", ".scss"]
  );
  
  config.resolve.alias
    // TODO: lib可能用不上 will be removed
    .set("lib", atLib())
    // components
    .set("@", atApp())
    .set("theme", atLib("default-theme"));

  const defaultHtmlTemplate = atApp("index.html");
  config
    .plugin("html")
    .use(HtmlWebpackPlugin, [{ template: defaultHtmlTemplate }]);
  config
    .plugin("hmr")
    .use(webpack.HotModuleReplacementPlugin);

  function applyTypeScriptPipeline (rule) {
    rule
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        appendTsxSuffixTo: [/\.md$/],
        configFile: atApp("tsconfig.json")
      });
  }
  // TypeScript
  const tsRule = config.module
    .rule("typescript")
    .test(/\.tsx?$/);
  applyTypeScriptPipeline(tsRule);
  // md
  const mdRule = config.module
    .rule("markdown")
    .test(/\.md$/);

  applyTypeScriptPipeline(mdRule);
  
  mdRule
    .use('markdown-loader')
    .loader(require.resolve('./markdownLoader'))
    .options({ sourceDir, markdown })

  // Scss
  const styleRule = config.module.rule("scss").test(/\.scss$/);
  styleRule.use("style-loader").loader("style-loader");
  styleRule.use("css-loader").loader("css-loader");
  styleRule.use("sass-loader").loader("sass-loader");

  return config;
}
