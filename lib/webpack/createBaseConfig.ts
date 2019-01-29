import ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
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
  config.devtool("eval");

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
  config
    .plugin("tscheck")
    .use(ForkTSCheckerWebpackPlugin, [{ tsconfig: atApp("tsconfig.json") }]);

  //  TODO, try the babel with ts
  // TypeScript
  const tsRule = config.module
    .rule("typescript")
    .test(/\.tsx?$/);

  tsRule.use("babel")
      .loader("babel-loader")
      .options({
        babelrc: false,
        cacheDirectory: true,
        plugins: [
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          "react-hot-loader/babel"
        ],
        presets: [
          [
            "@babel/preset-env",
            { targets: { browsers: "last 2 versions" } } // or whatever your project requires
          ],
          "@babel/preset-react",
          "@babel/preset-typescript"
        ]
      })
  // tsRule.use("typescript")
  //     .loader("ts-loader")
  //     .options({
  //       appendTsxSuffixTo: [/\.md$/],
  //       configFile: atApp("tsconfig.json")
  //     });

  // md, I don't need it now.
  // const mdRule = config.module
  //   .rule("markdown")
  //   .test(/\.md$/);

  // applyTypeScriptPipeline(mdRule);
  
  // mdRule
  //   .use('markdown-loader')
  //   .loader(require.resolve('./markdownLoader'))
  //   .options({ sourceDir, markdown })

  // Scss
  const styleRule = config.module.rule("scss").test(/\.scss$/);
  styleRule.use("style-loader").loader("style-loader");
  styleRule.use("css-loader").loader("css-loader");
  styleRule.use("sass-loader").loader("sass-loader");

  return config;
}
