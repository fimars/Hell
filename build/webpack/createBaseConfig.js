"use strict";
exports.__esModule = true;
var Config = require("webpack-chain");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var markdown = require("marked");
require("./markdownLoader"); // loader hacker
var resolvePaths_1 = require("../util/resolvePaths");
function default_1(ctx) {
    var isProd = process.env.NODE_ENV === "production";
    var outDir = ctx.siteConfig.dest;
    var config = new Config();
    config
        .context(resolvePaths_1.atRoot())
        .mode(isProd ? "production" : "development")
        .output.path(outDir)
        .filename(isProd ? "assets/js/[name].[chunkhash:8].js" : "assets/js/[name].js")
        .publicPath(ctx.siteConfig.base);
    if (!isProd) {
        config.devtool("cheap-module-eval-source-map");
    }
    var absoluteNodeModulePath = resolvePaths_1.atRoot("node_modules");
    console.log(absoluteNodeModulePath);
    config.resolve.alias
        .set("lib", resolvePaths_1.atLib())
        .set("@", resolvePaths_1.atApp())
        .set("theme", resolvePaths_1.atLib("default-theme"))
        .end()
        .extensions.merge([".ts", ".tsx", ".js", ".jsx", ".md", ".scss"])
        .end();
    config
        .plugin("html")
        .use(require("html-webpack-plugin"), [
        { template: resolvePaths_1.atApp("index.template.html") }
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
                    test: function (m) {
                        return /css\/mini-extract/.test(m.type);
                    }
                }
            }
        });
    }
    else {
        config.plugin("tscheck").use(ForkTsCheckerWebpackPlugin, [
            {
                tsconfig: resolvePaths_1.atApp("tsconfig.json"),
                compilerOptions: {
                    typeRoots: [resolvePaths_1.atRoot("node_modules/@types")]
                },
                workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
            }
        ]);
    }
    var mdRule = config.module.rule("markdown").test(/\.md?$/);
    var tsRule = config.module.rule("typescript").test(/\.tsx?$/);
    [mdRule, tsRule].forEach(function (rule) {
        return rule
            .use("babel")
            .loader("babel-loader")
            .options({
            babelrc: false,
            cwd: resolvePaths_1.atRoot(),
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
            .end();
    });
    // handle the markdown part
    mdRule
        .use("easy-markdown-loader")
        .loader(require.resolve("./markdownLoader"))
        .options({
        markdown: markdown
    })
        .end();
    var styleRule = config.module.rule("scss").test(/\.scss$/);
    if (isProd) {
        styleRule
            .use("extract-css-loader")
            .loader(require.resolve("mini-css-extract-plugin/dist/loader"));
    }
    else {
        styleRule.use("style-loader").loader("style-loader");
    }
    styleRule.use("css-loader").loader("css-loader");
    styleRule.use("sass-loader").loader("sass-loader");
    return config;
}
exports["default"] = default_1;
