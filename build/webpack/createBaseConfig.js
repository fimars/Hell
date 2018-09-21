"use strict";
exports.__esModule = true;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var Config = require("webpack-chain");
var resolvePaths_1 = require("../util/resolvePaths");
function default_1(_a) {
    var sourceDir = _a.sourceDir, markdown = _a.markdown;
    var config = new Config();
    config
        .entry("app")
        .add(resolvePaths_1.atApp("app.ts"));
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
        .set("lib", resolvePaths_1.atLib())
        // components
        .set("@", resolvePaths_1.atApp())
        .set('@source', sourceDir)
        .set("theme", resolvePaths_1.atLib("default-theme"));
    var defaultHtmlTemplate = resolvePaths_1.atApp("index.html");
    config
        .plugin("html")
        .use(HtmlWebpackPlugin, [{ template: defaultHtmlTemplate }]);
    function applyTypeScriptPipeline(rule) {
        rule
            .use("ts-loader")
            .loader("ts-loader")
            .options({
            appendTsxSuffixTo: [/\.md$/],
            configFile: resolvePaths_1.atLib("tsconfig.app.json")
        });
    }
    // TypeScript
    var tsRule = config.module
        .rule("typescript")
        .test(/\.tsx?$/);
    applyTypeScriptPipeline(tsRule);
    // md
    var mdRule = config.module
        .rule("markdown")
        .test(/\.md$/);
    applyTypeScriptPipeline(mdRule);
    mdRule
        .use('markdown-loader')
        .loader(require.resolve('./markdownLoader'))
        .options({ sourceDir: sourceDir, markdown: markdown });
    // Scss
    var styleRule = config.module.rule("scss").test(/\.scss$/);
    styleRule.use("style-loader").loader("style-loader");
    styleRule.use("css-loader").loader("css-loader");
    styleRule.use("sass-loader").loader("sass-loader");
    return config;
}
exports["default"] = default_1;
