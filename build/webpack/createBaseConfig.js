"use strict";
exports.__esModule = true;
var ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var Config = require("webpack-chain");
var resolvePaths_1 = require("../util/resolvePaths");
function default_1(_a) {
    var sourceDir = _a.sourceDir, markdown = _a.markdown;
    var config = new Config();
    config
        .entry("app")
        .add(resolvePaths_1.atApp("app.ts"));
    config.mode("development");
    config.devtool("eval");
    // 支持TypeScript扩展
    config.resolve.extensions.merge([".ts", ".tsx", ".js", ".jsx", ".md", ".scss"]);
    config.resolve.alias
        // TODO: lib可能用不上 will be removed
        .set("lib", resolvePaths_1.atLib())
        // components
        .set("@", resolvePaths_1.atApp())
        .set("theme", resolvePaths_1.atLib("default-theme"));
    var defaultHtmlTemplate = resolvePaths_1.atApp("index.html");
    config
        .plugin("html")
        .use(HtmlWebpackPlugin, [{ template: defaultHtmlTemplate }]);
    config
        .plugin("hmr")
        .use(webpack.HotModuleReplacementPlugin);
    config
        .plugin("tscheck")
        .use(ForkTSCheckerWebpackPlugin, [{ tsconfig: resolvePaths_1.atApp("tsconfig.json") }]);
    //  TODO, try the babel with ts
    // TypeScript
    var tsRule = config.module
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
    });
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
    var styleRule = config.module.rule("scss").test(/\.scss$/);
    styleRule.use("style-loader").loader("style-loader");
    styleRule.use("css-loader").loader("css-loader");
    styleRule.use("sass-loader").loader("sass-loader");
    return config;
}
exports["default"] = default_1;
