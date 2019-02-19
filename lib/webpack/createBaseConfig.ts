import Config = require("webpack-chain");
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import markdown = require("marked");
import "./markdownLoader"; // loader hacker

import { atApp, atLib, atRoot } from "../util/resolvePaths";
import { HellOptions } from "../prepare/resolveOptions";

export default function(ctx: HellOptions) {
  const isProd = process.env.NODE_ENV === "production";
  const outDir = ctx.siteConfig.dest;

  const config = new Config();

  config
    .context(atRoot())
    .mode(isProd ? "production" : "development")
    .output.path(outDir)
    .filename(
      isProd ? "assets/js/[name].[chunkhash:8].js" : "assets/js/[name].js"
    )
    .publicPath(ctx.siteConfig.base);

  if (!isProd) {
    config.devtool("cheap-module-eval-source-map");
  }

  const absoluteNodeModulePath = atRoot("node_modules");
  console.log(absoluteNodeModulePath);

  config.resolve.alias
    .set("lib", atLib())
    .set("@", atApp())
    .set("theme", atLib("default-theme"))
    .end()
    .extensions.merge([".ts", ".tsx", ".js", ".jsx", ".md", ".scss"])
    .end();

  config
    .plugin("html")
    .use(require("html-webpack-plugin"), [
      { template: atApp("index.template.html") }
    ]);
  if (isProd) {
    config.plugin("extract-css").use(require("mini-css-extract-plugin"), [
      {
        filename: "assets/css/styles.[chunkhash:8].css"
      }
    ]);

    /**
     * SplitChunks Suggest
     * From https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/webpack/createBaseConfig.js#L267
     */
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          chunks: "all",
          enforce: true,
          name: "styles",
          // necessary to ensure async chunks are also extracted
          test: (m: { type: string }) => {
            return /css\/mini-extract/.test(m.type);
          }
        }
      }
    });
  } else {
    config.plugin("tscheck").use(ForkTsCheckerWebpackPlugin, [
      {
        tsconfig: atApp("tsconfig.json"),
        compilerOptions: {
          typeRoots: [atRoot("node_modules/@types")]
        },
        workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
      }
    ]);
  }

  const mdRule = config.module.rule("markdown").test(/\.md?$/);

  const tsRule = config.module.rule("typescript").test(/\.tsx?$/);

  [mdRule, tsRule].forEach(rule =>
    rule
      .use("babel")
      .loader("babel-loader")
      .options({
        babelrc: false,
        cwd: atRoot(),
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
      .end()
  );

  // handle the markdown part
  mdRule
    .use("easy-markdown-loader")
    .loader(require.resolve("./markdownLoader"))
    .options({
      markdown
    })
    .end();

  const styleRule = config.module.rule("scss").test(/\.scss$/);
  if (isProd) {
    styleRule
      .use("extract-css-loader")
      .loader(require.resolve("mini-css-extract-plugin/dist/loader"));
  } else {
    styleRule.use("style-loader").loader("style-loader");
  }
  styleRule.use("css-loader").loader("css-loader");
  styleRule.use("sass-loader").loader("sass-loader");
  return config;
}
