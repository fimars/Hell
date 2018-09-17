"use strict";
exports.__esModule = true;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var Config = require("webpack-chain");
var resolvePaths_1 = require("../util/resolvePaths");
function default_1() {
    var config = new Config();
    config.entry("app").add(resolvePaths_1.atApp("app.ts"));
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
        .set("lib", resolvePaths_1.atLib())
        .set("@", resolvePaths_1.atApp())
        .set("theme", resolvePaths_1.atLib("default-theme"));
    var defaultHtmlTemplate = resolvePaths_1.atApp("index.html");
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
        configFile: resolvePaths_1.atLib("tsconfig.app.json")
    });
    // TODO: Use pipe loader for scss file in WebpackChain.
    // Scss
    var baseConfig = config.module.rule("scss").test(/\.scss$/);
    baseConfig.use("style-loader").loader("style-loader");
    baseConfig.use("css-loader").loader("css-loader");
    baseConfig.use("sass-loader").loader("sass-loader");
    return config;
}
exports["default"] = default_1;
