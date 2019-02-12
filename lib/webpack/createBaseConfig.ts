import path = require("path");
import ExtractCss = require("mini-css-extract-plugin");
import Config = require("webpack-chain");

import { atApp, atLib, atRoot } from "../util/resolvePaths";

export default function({ sourceDir, markdown }) {
  const isProd = process.env.NODE_ENV === "production";
  const outDir = path.resolve(process.cwd(), "dist");

  console.log(outDir);

  const config = new Config();

  config
    .context(atRoot())
    .mode(isProd ? "production" : "development")
    .output.path(outDir)
    .filename(
      isProd ? "assets/js/[name].[chunkhash:8].js" : "assets/js/[name].js"
    );
  // .publicPath()

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
    config.plugin("extract-css").use(ExtractCss, [
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
          test: m => {
            return /css\/mini-extract/.test(m.type);
          }
        }
      }
    });
  } else {
    config.plugin("tscheck").use(require("fork-ts-checker-webpack-plugin"), [
      {
        tsconfig: atApp("tsconfig.json"),
        compilerOptions: {
          typeRoots: [atRoot("node_modules/@types")]
        }
      }
    ]);
  }

  config.module
    .rule("typescript")
    .test(/\.tsx?$/)
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
    });

  const styleRule = config.module.rule("scss").test(/\.scss$/);
  if (isProd) {
    styleRule.use("extract-css-loader").loader(ExtractCss.loader);
  } else {
    styleRule.use("style-loader").loader("style-loader");
  }
  styleRule.use("css-loader").loader("css-loader");
  styleRule.use("sass-loader").loader("sass-loader");
  return config;
}
