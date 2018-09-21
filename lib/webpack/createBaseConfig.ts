import HtmlWebpackPlugin = require("html-webpack-plugin");
import Config = require("webpack-chain");

import { atApp, atLib } from "../util/resolvePaths";
import markdownLoader from './markdownLoader';

export default function({
  sourceDir,
  markdown
}) {
  const config = new Config();

  config
    .entry("app")
    .add(atApp("app.ts"));

  // TODO: remove this preset
  config.set("mode", "development");
  config.devtool("source-map");

  // 支持TypeScript扩展
  config.resolve.extensions
    .add(".ts")
    .add(".tsx")
    .add(".js")
    .add(".jsx")
    .add(".md")
    .add(".scss");

  config.resolve.alias
    // TODO: lib可能用不上 will be removed
    .set("lib", atLib())
    // components
    .set("@", atApp())
    .set('@source', sourceDir)
    .set("theme", atLib("default-theme"));

  const defaultHtmlTemplate = atApp("index.html");
  config
    .plugin("html")
    .use(HtmlWebpackPlugin, [{ template: defaultHtmlTemplate }]);

  function applyTypeScriptPipeline (rule) {
    rule
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        appendTsxSuffixTo: [/\.md$/],
        configFile: atLib("tsconfig.app.json")
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
