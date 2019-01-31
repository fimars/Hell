"use strict";
exports.__esModule = true;
var ExtractCss = require("mini-css-extract-plugin");
var Config = require("webpack-chain");
var resolvePaths_1 = require("../util/resolvePaths");
function default_1(_a) {
    var sourceDir = _a.sourceDir, markdown = _a.markdown;
    var isProd = process.env.NODE_ENV === "production";
    var outDir = resolvePaths_1.atRoot("dist");
    var config = new Config();
    config
        .mode(isProd ? "production" : "development")
        .output.path(outDir)
        .filename(isProd ? "assets/js/[name].[chunkhash:8].js" : "assets/js/[name].js");
    // .publicPath()
    if (!isProd) {
        config.devtool("cheap-module-eval-source-map");
    }
    config.resolve.alias
        .set("lib", resolvePaths_1.atLib())
        .set("@", resolvePaths_1.atApp())
        .set("theme", resolvePaths_1.atLib("default-theme"))
        .end()
        .extensions.merge([".ts", ".tsx", ".js", ".jsx", ".md", ".scss"])
        .end();
    config
        .plugin("html")
        .use(require("html-webpack-plugin"), [{ template: resolvePaths_1.atApp("index.html") }]);
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
                    test: function (m) {
                        return /css\/mini-extract/.test(m.type);
                    }
                }
            }
        });
    }
    else {
        config
            .plugin("tscheck")
            .use(require("fork-ts-checker-webpack-plugin"), [
            { tsconfig: resolvePaths_1.atApp("tsconfig.json") }
        ]);
    }
    config.module
        .rule("typescript")
        .test(/\.tsx?$/)
        .use("babel")
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
    var styleRule = config.module.rule("scss").test(/\.scss$/);
    if (isProd) {
        styleRule.use("extract-css-loader").loader(ExtractCss.loader);
    }
    else {
        styleRule.use("style-loader").loader("style-loader");
    }
    styleRule.use("css-loader").loader("css-loader");
    styleRule.use("sass-loader").loader("sass-loader");
    return config;
}
exports["default"] = default_1;
